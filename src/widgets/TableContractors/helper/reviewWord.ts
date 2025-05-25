export const getReviewWord = (count: number): string => {
    if (count === 1) {
        return 'отзыва';
    } else {
        return 'отзывов';
    }
};
