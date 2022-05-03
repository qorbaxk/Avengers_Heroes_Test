const url = 'https://avengers-heroes-test.netlify.app/';

function setShare(){
  let resultImg = document.querySelector('#resultImg');
  let resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = '내가 어벤져스라면? 결과';
  const shareDesc = `${infoList[resultAlt].ex} ${infoList[resultAlt].name}`;
  const shareImage = `${url}img/image-${resultAlt}.png`;
  const shareURL = `${url}page/result-${resultAlt}.html`;
  
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDesc,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL
      },
    },
      buttons: [
        {
          title: '결과확인하기',
          link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL
          },
        }
      
      
    ]
  });

}