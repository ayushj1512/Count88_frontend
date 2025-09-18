export const fetchCoupons = async () => {
  try {
    console.log("[fetchCoupons] Fetching coupons from API...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coupons`);
    if (!res.ok) throw new Error("Failed to fetch coupons");

    const data = await res.json();
    console.log("[fetchCoupons] Raw API response:", data);

    // Properly extract coupons array
    if (data.success && Array.isArray(data.data)) {
      console.log("[fetchCoupons] Returning data array:", data.data);
      return data.data; // ✅ return only the array of coupons
    }

    if (Array.isArray(data)) {
      console.log("[fetchCoupons] Returning array of coupons:", data);
      return data;
    }

    console.warn("[fetchCoupons] No valid coupons found in response");
    return [];
  } catch (error) {
    console.error("[fetchCoupons] Error fetching coupons:", error);
    return [];
  }
};
