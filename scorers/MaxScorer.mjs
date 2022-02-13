
/**
 * Scores a histogram of possible answers, based on the bucket with the highest number of answers.
 */
export default class MaxScorer {

    /**
     * @param  {Object<number, number>} histogram Histogram with the number of possible answers for each response (encoded as its key).
     * @returns 
     */
    getScore(histogram) {
        var max = 0;
        for (var response in histogram) {
            if (histogram[response] > max) {
                max = histogram[response];
            }
        }
        return max;
    }
}