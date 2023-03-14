const subjects = [
  "Programming",
  "Data Science",
  "Technology",
  "Self Improvement",
  "Writing",
  "Relationships",
  "Machine Learning",
  "Productivity",
  "Politics",
];

async function getArticles(isTrending) {
  const response = isTrending
    ? await fetch("./jsons/trending-articles.json")
    : await fetch("./jsons/articles.json");
  const json = await response.json();
  return json;
}

getArticles(true).then((trendingArticles) => {
  const trends = document.createElement("div");
  trends.classList.add("trending-articles");
  trendingArticles.map((trendingArt, i) => {
    const trendingArticleCount = document.createElement("div");
    trendingArticleCount.classList.add("trending-article-count");
    trendingArticleCount.innerText = `0${i + 1}`;
    const title = document.createElement("h3");
    title.innerText = trendingArt.title;
    const dateAndType = document.createElement("p");
    dateAndType.innerText =
    trendingArt.date + " · " + trendingArt.length;
    const trendingArticleAuthor = document.createElement("div");
    trendingArticleAuthor.classList.add("trending-article-author");
    const authorImage = document.createElement("img");
    authorImage.src = trendingArt.authorImageUrl;
    authorImage.style.borderRadius = i !== 5 ? "50%" : "20%";
    const authorName = document.createElement("p");
    authorName.innerText = trendingArt.author;
    trendingArticleAuthor.appendChild(authorImage);
    trendingArticleAuthor.appendChild(authorName);
    const trendingArticleDescription = document.createElement("div");
    trendingArticleDescription.classList.add("trending-article-description");
    trendingArticleDescription.appendChild(trendingArticleAuthor);
    trendingArticleDescription.appendChild(title);
    trendingArticleDescription.appendChild(dateAndType);
    const trendingArticle = document.createElement("div");
    trendingArticle.classList.add("trending-article");
    trendingArticle.appendChild(trendingArticleCount);
    trendingArticle.appendChild(trendingArticleDescription);
    trends.appendChild(trendingArticle);
  });
  document.querySelector(".trending-section").appendChild(trends);
});

for (let i = 0; i < subjects.length; ++i) {
  const subject = document.createElement("p");
  subject.innerText = subjects[i];
  document.querySelector(".subject-section").appendChild(subject);
}

getArticles(false).then((articles) => {
  const sections = document.querySelectorAll(".article-section");
  sections.forEach((element, index) => {
    element.innerHTML =
      `<div class="article-description"><h2> ${articles[index].title}</h2>` +
      `<h3> ${articles[index].description}</h3>` +
      `<p>${articles[index].date} &#183; ${articles[index].length} &#183;
       <button>${articles[index].type}</button></p></div>` +
      `<img width="250px" src="${articles[index].imageUrl}">`;
  });
});
