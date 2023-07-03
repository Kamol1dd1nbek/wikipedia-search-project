const form = document.querySelector(".searchForm");

const submitFunction = (event) => {
    event.preventDefault();
    let inputValue = document.querySelector(".searchInput").value;
    let query = inputValue.trim();

    getRusults(query);
}

form.addEventListener("submit", submitFunction);

const getRusults = (query) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.query.search)
            addResults(data.query.search)
        })
        .catch((e) => console.error(`Error: ${e}`));
}

const addResults = (sResults) => {
    const searchresult = document.querySelector("#quti");
    console.log(searchresult);
    searchresult.innerHTML = '';

    sResults.forEach((result) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        searchresult.insertAdjacentHTML("afterbegin", `

            <div class="col">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h4><a href="${url}" target="_blank">${result.title}</a></h4>
                  <p class="card-text">${result.snippet}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="${url}" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
            )
    })
}

