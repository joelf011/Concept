'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

// Login
export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Se as credenciais estiverem erradas, devolvemos a mensagem de erro
    return { error: error.message }
  }

  // Se o login for um sucesso, redirecionamos para a Home (futuramente para o Checkout)
  redirect('/') 
}

// Registo
export async function register(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  // Se o registo for bem suce, redirecionamos para o login com um aviso
  redirect('/login?registered=true')
}

// Logout
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  // Após sair, redireciona para a página principal
  redirect('/')
}

// Update profile
export async function updateProfile(prevState, formData) {
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const phone = formData.get('phone')
  const address = formData.get('address')
  
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      address: address,
    }
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return { success: true }
}

// Atualizar informação básica
export async function updateBasicInfo(prevState, formData) {
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const dob = formData.get('dob')
  
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: { first_name: firstName, last_name: lastName, dob: dob }
  })

  if (error) return { error: error.message, success: false }
  return { success: true, message: 'Personal details updated successfully.' }
}

// Atualiza Email (Exige Password)
export async function updateEmailSecure(prevState, formData) {
  const newEmail = formData.get('newEmail')
  const currentPassword = formData.get('currentPassword')
  const supabase = await createClient()

  // Confirmar se a password atual está correta
  const { data: { user } } = await supabase.auth.getUser()
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })

  if (signInError) return { error: 'Incorrect current password.', success: false }

  // Atualizar o Email (O Supabase enviará um email de confirmação)
  const { error: updateError } = await supabase.auth.updateUser({ email: newEmail })
  if (updateError) return { error: updateError.message, success: false }

  return { success: true, message: 'Confirmation link sent to your new email.' }
}

// Atualiza Password
export async function updatePasswordSecure(prevState, formData) {
  const oldPassword = formData.get('oldPassword')
  const newPassword = formData.get('newPassword')
  const supabase = await createClient()

  // Validação extra no servidor
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!passwordRegex.test(newPassword)) {
    return { error: 'Password does not meet security requirements.', success: false }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: oldPassword,
  })

  if (signInError) return { error: 'Incorrect current password.', success: false }

  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })
  if (updateError) return { error: updateError.message, success: false }

  return { success: true, message: 'Password updated successfully.' }
}

// Atualiza o Telemóvel apenas como informação
export async function updatePhoneSimple(prevState, formData) {
  const prefix = formData.get('prefix')
  const phone = formData.get('phone')

  const supabase = await createClient()

  // Guardamos nos 'data' para não acionar o envio de SMS do Supabase
  const { error } = await supabase.auth.updateUser({
    data: { 
      phone_prefix: prefix, 
      phone_number: phone 
    }
  })

  if (error) return { error: error.message, success: false }
  
  return { success: true, message: 'Mobile number saved successfully.' }
}

export async function deleteAccount(prevState, formData) {
  // Verifica quem está logado usando o cliente normal
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not found.', success: false }
  }

  // Cria o cliente de Admin para poder apagar a conta
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Apaga o utilizador definitivamente
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

  if (error) {
    return { error: error.message, success: false }
  }

  // Se houver sucesso, os cookies de sessão são inválidos e volta à home
  redirect('/')
}

// Atualiza a Morada de Envio
export async function updateAddress(prevState, formData) {
  const shipping_address = {
    firstName: formData.get('addressFirstName'),
    lastName: formData.get('addressLastName'),
    prefix: formData.get('addressPrefix'),
    phone: formData.get('addressPhone'),
    addressLine: formData.get('addressLine'),
    additionalInfo: formData.get('additionalInfo'),
    postalCode: formData.get('postalCode'),
    city: formData.get('city'),
    district: formData.get('district'),
    country: formData.get('country')
  }

  const supabase = await createClient()

  // Guarda a morada dentro dos metadados do utilizador
  const { error } = await supabase.auth.updateUser({
    data: { shipping_address }
  })

  if (error) return { error: error.message, success: false }
  
  return { success: true, message: 'Shipping address updated successfully.' }
}