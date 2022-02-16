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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  const generateTitleLinks= function(customSelector = ''){
    /* find link list and set empty html variable */
    let titleList = document.querySelector(optTitleListSelector),
      html = '';

    /* clear link list */

    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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
  };

  generateTitleLinks();

  const addClickListenersToArticlesList = function() {
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  addClickListenersToArticlesList();

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
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
        if(allTags.indexOf(tagLink) == -1){
          /* [NEW] add generated code to allTags array */
          allTags.push(tagLink);
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      articleTag.innerHTML = html;
      /* END LOOP: for every article: */
      const tagList = document.querySelector(optTagsListSelector);

      /* [NEW] add html from allTags to tagList */
      tagList.innerHTML = allTags.join(' ');
    }
  };

  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll('a.active[href^="#tag-"');
    console.log(tagsActive);
    /* START LOOP: for each active tag link */
    for(let activeTag of tagsActive){
      /* remove class active */
      activeTag.classList.remove('active');
    }
    /* END LOOP: for each active tag link */
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagsLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagsLinks){
      console.log(tagLink);
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    /* reapply event listeners on article list */
    addClickListenersToArticlesList();
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const links = document.querySelectorAll(optArticleTagsSelector + ' a');
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    // select
    let articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find author wrapper */
      let articleAuthor = article.querySelector(optArticleAuthorSelector);
      /* get author from data-author attribute */
      const authorName = article.getAttribute('data-author');
      /* generate HTML of the link */
      const authorLink = '<a href="#author-' + authorName + '">' + authorName + '</a>';
      /* insert HTML of all the link into the author wrapper */
      articleAuthor.innerHTML = authorLink;
    }
  };

  generateAuthors();

  const authorClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log();
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);
    /* find all tag links with class active */
    const authorActive = document.querySelectorAll('a.active[href^="#author-"');
    console.log(authorActive);
    /* START LOOP: for each active author link */
    for(let activeAuthor of authorActive){
      /* remove class active */
      activeAuthor.classList.remove('active');
    }
    /* END LOOP: for each active author link */
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(authorLinks);
    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks){
      /* add class active */
      authorLink.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with author selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
    /* reapply event listeners on article list */
    addClickListenersToArticlesList();
  };

  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const links = document.querySelectorAll(optArticleAuthorSelector + ' a');
    /* START LOOP: for each link */
    for(let link of links){
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();

}
