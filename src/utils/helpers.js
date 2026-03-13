export const formatPrice = (price) => {
  if (!price || price === 0) return "FREE";
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

export const getInitials = (name = "") => {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

export const truncate = (str = "", length = 100) => {
  return str.length > length ? str.slice(0, length) + "..." : str;
};

export const getProgressColor = (pct) => {
  if (pct >= 100) return "#48BB78";
  if (pct >= 50) return "#6C63FF";
  if (pct >= 25) return "#ECC94B";
  return "#FC8181";
};

export const getImageFallback = (id, title = "course") => {
  const seed = id || title.replace(/\s+/g, "-").toLowerCase();
  return `https://picsum.photos/seed/${seed}/400/250`;
};
