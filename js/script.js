'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const hrefValue = clickedElement.getAttribute('href');
    console.log(hrefValue);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(hrefValue);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){
    /* find link list and set empty html variable */
    let titleList = document.querySelector(optTitleListSelector),
      html = '';

    /* clear link list */

    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){
      /* get the article id, select article title and create link */
      const articleId = article.getAttribute('id'),
        articleTitle = article.querySelector(optTitleSelector).innerHTML,
        linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;

    }

    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const generateTags = function(){
    /* find all articles */
    let articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      let articleTag = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let  html = '';
      /* get tags from data-tags attribute */
      const  articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const  articleTagsArray  = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + tagLink;
      }
      /* END LOOP: for each tag */
      articleTag.innerHTML = html;
      /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
    }
  };

  generateTags();

}
