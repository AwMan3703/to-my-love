
function fetchme(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            return response.json()
        })
        .then(data => {
            callback(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        });

}