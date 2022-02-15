
/**
 * Scores a histogram of possible answers, based on the expected bucket size.
 * 
 * The probability to pick a bucket is proportional to the number of possible answers in that bucket.
 * 
 * So, the expected bucket size is:
 * 
 * Sum(i=0 to n) (probability of picking bucket i * size of bucket i) = 
 * Sum(i=0 to n) (size of bucket i / total size) * size of bucket i = 
 * Sum(i=0 to n) (size of bucket i) ^ 2 / total size
 */
export default class ExpectedValueScorer {

    /**
     * @param  {Object<number, number>} histogram Histogram with the number of possible answers for each response (encoded as its key).
     * @returns 
     */
    getScore(histogram) {
        var squaredSum = 0;
        var count = 0;
        for (var size of Object.values(histogram)) {
            squaredSum += size * size;
            count += size;
        }
        return squaredSum / count;
    }
}