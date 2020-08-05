const formatDate = (dateString, crop = false) => {
    return (
        dateString?.substr(8, 2) +
        '/' +
        dateString?.substr(5, 2) +
        '/' +
        dateString?.substr(0, 4) +
        ' - ' +
        dateString?.substr(11, 2) +
        ':' +
        dateString?.substr(14, 2)
    )
}

export default formatDate
