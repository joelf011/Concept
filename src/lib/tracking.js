export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getTimelineStep(status) {
  const current = status?.toLowerCase();

  switch (current) {
    case "processing":
      return 2;
    case "shipped":
      return 3;
    case "delivered":
      return 4;
    default:
      return 1;
  }
}

export function getTrackingDetails(order) {
  const tracking = order?.tracking_number;
  const method = String(order?.shipping_method || "").toUpperCase();

  if (method.includes("PT_") || method.includes("CTT")) {
    return {
      carrier: "CTT",
      url: `https://www.ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx?objects=${tracking}`,
    };
  }

  return {
    carrier: "International Carrier",
    url: `https://parcelsapp.com/en/tracking/${tracking}`,
  };
}