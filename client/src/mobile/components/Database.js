export default function query(method, date, value=null) {
    if (method === "get")
        return _read(date)
    if (method === "post")
        return _create(date, value)
    if (method === "patch")
        return _update(date, value)
    if (method === "delete")
        return _delete(date)
}

function _read(date) {
    let db_query = serealise_date(date);
    let raw_data = localStorage.getItem(db_query);
    if (raw_data === null)
        return [404, null];
    else
        return [200, parse_data(raw_data)];
}

function _create(date, value) {
    let db_query = serealise_date(date);
    let data = stringify_data(value);
    localStorage.setItem(db_query, data);
    return [201, null];
}

function _update(date, value) {
    let data = _read(date);
    if (data[0] === 404) {
        _create(date, value);
    } 
    else {
        var data_copy = data[1];
        for (let key of Object.keys(value)) {
            data_copy[key] = value[key];
        }
        localStorage.setItem(
            serealise_date(date), 
            stringify_data(data_copy)
        )
    }
    return [202, null];
}

function _delete(date) {
    let data = _read(date);
    if (data[0] === 404)
        return [404, null];
    else {
        localStorage.removeItem(
            serealise_date(date)
        )
        return [410, null];
    }
}

function serealise_date(date) {
    const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
    return year + "-" + month + "-" + day;
}

function parse_data(data) {
    return JSON.parse(data);
}
function stringify_data(data) {
    return JSON.stringify(data);
}