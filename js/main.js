let baseURL = 'https://api.themoviedb.org/3/';
let imageURL = "https://image.tmdb.org/t/p/w185";
let apiKey = "5e7fe57d0a7a45874cfb23d3319cded8";
let container = document.getElementById('wrapContent');
let ul = document.createElement('ul');
let movieInfoWrap = document.getElementById('moreInfo');
let wrapSearch = document.createElement('div');

function getData(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myResponse = JSON.parse(this.responseText);


            for (i=0; i < myResponse.results.length; i++){
                let movie = myResponse.results[i];
                let li = document.createElement('li');
                let a = document.createElement('a');

                a.setAttribute('href', '#');
                a.innerText = `${movie.original_title}`;

                li.appendChild(a);
                ul.appendChild(li);
                container.appendChild(ul);

                a.addEventListener('click', function () {
                    let id = movie.id;
                    let h3 = document.createElement('h3');
                    let overview = movie.overview;
                    let p = document.createElement('p');
                    let img = document.createElement('img');
                    let poster = movie.poster_path;
                    let btn = document.createElement('button');

                    ul.style.display = 'none';
                    img.setAttribute('src', `${imageURL}${poster}`);
                    img.className = 'descImg';
                    h3.innerText = `${movie.original_title}`;
                    p.innerText = `${overview}`;
                    btn.innerText = 'Go back';
                    btn.className = 'btnBack';
                    btn.addEventListener('click',function () {
                        movieInfoWrap.style.display = 'none';
                        goBack();
                    });

                    movieInfoWrap.appendChild(img);
                    movieInfoWrap.appendChild(h3);
                    movieInfoWrap.appendChild(p);
                    movieInfoWrap.appendChild(btn);

                    getRecommend(id);
                    movieInfoWrap.style.display = 'flex';
                });

            }
        }
    };
    xhttp.open("GET", `${baseURL}discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`,true);
    xhttp.send();
}
getData();


function search(){
    let keyword = document.getElementById('titleMovie').value;

    wrapSearch.setAttribute('id', 'searchingMovies');
    wrapSearch.innerHTML = '';
    ul.style.display = 'none';

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let resp = JSON.parse(this.responseText);

            for (i=0; i < resp.results.length; i++){
                let movie = resp.results[i];
                let div = document.createElement('div');
                let title = document.createElement('h3');
                let img = document.createElement('img');
                let poster = movie.poster_path;


                title.innerText = `${movie.original_title}`;
                img.setAttribute('src', `${imageURL}${poster}`);
                img.style.width = 'auto';
                img.style.height = 'auto';
                div.appendChild(title);
                div.appendChild(img);
                wrapSearch.appendChild(div);
                container.appendChild(wrapSearch);
                console.log(resp.results[i]);
            }

        }
    };
    xhttp.open("GET", `${baseURL}search/movie?api_key=${apiKey}&query=${keyword}`,true);
    xhttp.send();
}

function goBack() {
    ul.style.display = 'block';
    movieInfoWrap.innerHTML = '';
}

function home() {
    let input = document.getElementById('titleMovie');
    input.value = '';
    wrapSearch.innerHTML = '';
    movieInfoWrap.innerHTML = '';
    ul.style.display = 'block';
}

function getRecommend(id) {
    let wrapRecommend = document.createElement('div');
    let titleRecommend = document.createElement('h4');
    let recommendUl = document.createElement('ul');

    wrapRecommend.setAttribute('class', 'recommend');
    titleRecommend.innerText = 'Recomendations';
    titleRecommend.className = 'titleRecommend';

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let respons = JSON.parse(this.responseText);
            respons.results.splice(3,19);

            for(i = 0; i < respons.results.length; i++){
                let li = document.createElement('li');
                let a = document.createElement('a');

                a.setAttribute('href', '#');
                a.innerText = respons.results[i].original_title;

                li.appendChild(a);
                recommendUl.appendChild(li);
                wrapRecommend.appendChild(titleRecommend);
                wrapRecommend.appendChild(recommendUl);
                movieInfoWrap.appendChild(wrapRecommend);
                console.log(respons.results[i]);
            }

        }
    };
    xhttp.open("GET", `${baseURL}movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`,true);
    xhttp.send();
}
