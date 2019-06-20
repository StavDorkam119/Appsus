

export const emailService = {
    query
}




function query() {
    return fetch('.../data/emails.json')
    .then(res => res.json())
    .catch(err => console.log(err)
    )
}