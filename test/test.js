function getItems() {
    const URL = "https://opendict.korean.go.kr/api/search";
    const option = {
        headers: {
        Authorization: "451765879188A8713EE3DE8E5C5AFE46"
        }
    }
    return fetch('https://opendict.korean.go.kr/api/search?')
            .then(response => response.json())
            .then(json => json.items);
}

getItems();