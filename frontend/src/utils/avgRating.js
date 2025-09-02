const calculateAvgRating = (reviews = []) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return {
      totalRating: 0,
      avgRating: 0, // return 0 instead of "Not rated"
    };
  }

  // Filter out invalid ratings just in case
  const validRatings = reviews.map(r => Number(r.rating) || 0);
  const totalRating = validRatings.reduce((acc, val) => acc + val, 0);
  const avgRating = (totalRating / validRatings.length).toFixed(1);

  return {
    totalRating,
    avgRating: Number(avgRating),
  };
};

export default calculateAvgRating;
