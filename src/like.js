document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.heart-icon').forEach(likeBtn => {
      let numberOfLikesElement = likeBtn.nextElementSibling;
      let numberOfLikes = Number.parseInt(numberOfLikesElement.textContent, 10);
      let isLiked = likeBtn.classList.contains('isLiked');
  
      const likeClick = () => {
        if (!isLiked) {
          likeBtn.classList.add('isLiked');
          numberOfLikes++;
        } else {
          likeBtn.classList.remove('isLiked');
          numberOfLikes--;
        }
        numberOfLikesElement.textContent = numberOfLikes;
        isLiked = !isLiked;
      };
  
      likeBtn.addEventListener('click', likeClick);
    });
  });
  