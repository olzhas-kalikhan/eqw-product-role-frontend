export default {
    getDateFromString: (stringDate) => (new Date(stringDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })),
}