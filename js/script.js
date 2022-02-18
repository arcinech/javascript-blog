'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagLink:  Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
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
    optAuthorsListSelector= '.list.authors' ,
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optActiveTags = 'a.active[href^="#tag-"',
    optActiveAuthor = 'a.active[href^="#author-"',
    optSelectAllTags = 'a[href^="#tag-"',
    optSelectAllAuthors = 'a[href^="#author-"';

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
        linkHTMLData = {id: articleId, title: articleTitle},
        linkHTML = templates.articleLink(linkHTMLData);
        //linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  const calculateTagsParams = function(tags){
    let params = {min:'',max:''};
    for(let tag in tags){
      params.min = Math.min(tags[tag], params.min);
      params.max = Math.max(tags[tag], params.max);
    }
    return params;
  };

  const  calculateTagClass = function(count, params){
    const normalizedCount = count - params.min,
      normalizedMax = params.max - params.min,
      percentage = normalizedCount / normalizedMax,
      classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
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
        //const tagLink = '<li><a  href="#tag-' + tag + '">' + tag + '</a> </li> ';
        const linkHTMLData = {id: tag , title: tag},
          linkHTML = templates.articleLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      articleTag.innerHTML = html;
      /* END LOOP: for every article: */
      const tagList = document.querySelector(optTagsListSelector);
      /* [NEW] create variable for all links HTML code */
      const tagsParams = calculateTagsParams(allTags);
      const allTagsData = {tags: []};
      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
        /* [NEW] END LOOP: for each tag in allTags: */
      }
      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
      console.log(allTagsData);
    }
  };

  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll(optActiveTags);
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
    const links = document.querySelectorAll(optSelectAllTags);
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    /* select all articles */
    let articles = document.querySelectorAll(optArticleSelector);
    /* array for authors count */
    let allAuthor = {};
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find author wrapper */
      let articleAuthor = article.querySelector(optArticleAuthorSelector);
      /* get author from data-author attribute */
      const authorName = article.getAttribute('data-author');
      /* generate HTML of the link */
      const linkHTMLData = {href: authorName , title: authorName},
        linkHTML = templates.authorLink(linkHTMLData);
      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthor[authorName]) {
        /* [NEW] add tag to allTags object */
        allAuthor[authorName] = 1;
      } else {
        allAuthor[authorName]++;
      }
      /* insert HTML of all the link into the author wrapper */
      articleAuthor.innerHTML = linkHTML;

      const authorList = document.querySelector(optAuthorsListSelector);
      /* [NEW] create variable for all links HTML code */
      const allAuthorsData = {authors: []};
      /* [NEW] START LOOP: for each tag in allTags: */
      for(let author in allAuthor){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        allAuthorsData.authors.push({
          author: author,
          count: allAuthor[author],
        });
        /* [NEW] END LOOP: for each tag in allTags: */
      }

      /*[NEW] add HTML from allTagsHTML to tagList */
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
      console.log(allAuthorsData);
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
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all tag links with class active */
    const authorActive = document.querySelectorAll(optActiveAuthor);
    /* START LOOP: for each active author link */
    for(let activeAuthor of authorActive){
      /* remove class active */
      activeAuthor.classList.remove('active');
    }
    /* END LOOP: for each active author link */
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
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
    const links = document.querySelectorAll(optSelectAllAuthors);
    /* START LOOP: for each link */
    for(let link of links){
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();

}
