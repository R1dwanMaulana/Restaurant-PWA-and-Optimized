import CONFIG from '../../globals/config';

const restoListTemplate = (list) => `
<div class="card">
<div class="card-picture">
    <img src="/images/icons/lazyimg1.png" class="lazyload" data-src="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_SML}/${list.pictureId}" alt="restoran ${list.name}">
</div>
<div class="card-description">
    <div class="card-header">
        <p>${list.name}</p>
    </div>
    <p><i class="far fa-smile"></i> Rating: ${list.rating}</p>
    <p><i class="fas fa-location-arrow"></i> Lokasi: ${list.city}</p> <br>
    <hr>
    <p>${list.description.substring(0, 220)} ...</p>
    <div class="card-btn">
        <a href="#/detail/${list.id}"><button class="btn btn-desc"><i class="fas fa-info-circle"></i> Lihat Restoran</button></a>
    </div>
</div>
</div>
`;

const restoFavoriteTemplate = (list) => `
<div class="card-fav">
<div class="card-picture2">
<img src="/images/icons/lazyimg1.png" class="lazyload" data-src="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_SML}/${list.pictureId}" alt="restoran ${list.name}">
</div>
<div class="card-description2">
    <div class="card-header2">
        <p>${list.name}</p>
    </div>
    <p><i class="far fa-smile"></i> Rating: ${list.rating}</p>
    <p><i class="fas fa-location-arrow"></i> Lokasi: ${list.city}</p> <br>
    <hr>
    <p>${list.description.substring(0, 220)} ...</p>
    <div class="card-btn">
        <a href="#/detail/${list.id}"><button class="btn btn-desc2"><i class="fas fa-info-circle"></i> Lihat Restoran</button></a>
    </div>
</div>
</div>
`;

const detailRestoCategoryTemplate = (category) => `
<a>${category.name}</a>
`;

const userRateTemplate = (user) => `
<div class="card-testi">
<div class="card-profile">
        <img src="${user.profile}" alt="profil dari ${user.name}" class="card-img">
    <h2 class="card-name">
        <p>${user.name}</p>
    </h2>
    <h3 class="card-info">
        <p>${user.statusJob}</p>
    </h3>
</div>
    <i class="fa quote fa-quote-left" aria-hidden="true" class="card-icon"></i>
    <p class="card-desc">${user.desc}</p>

</div>
`;

const restoDetailTemplate = (resto) => `
<div class="detail">
<h2>Detail Restoran</h2>

<div class="head">
    <img src="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_MED}/${resto.pictureId}" 
    srcset="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_SML}/${resto.pictureId} 550w, ${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_MED}/${resto.pictureId} 800w"
    sizes="(max-width: 700px) 700px, 800px" 
    alt="Restoran ${resto.name}">
    <table>
        <tr>
            <td><i class="fas fa-store-alt"></i></td>
            <td><a>${resto.name}</a></td>
        </tr>
        <tr>
            <td><i class="fas fa-star"></i></td>
            <td><a>${resto.rating}</a></td>
        </tr>
        <tr>
            <td><i class="fas fa-utensils"></i></td>
            <td><a id="categories"></a></td>
        </tr>
        <tr>
            <td><i class="fas fa-location-arrow"></i></td>
            <td><a>${resto.address}, ${resto.city}</a></td>
        </tr>
    </table>
</div>

<div class="he">
<h2>Deskripsi</h2>
<div class="desc">
    <p>${resto.description}</p>
</div>
</div>
</div>
`;

const userReviewTemplate = (user) => `
<div class="card2">
            <div class="card-main">
                <img src="/images/icons/lazyimg.png" class="lazyload" data-src="./images/users/default.png" alt="anonym">
            </div>
            <div class="card-desc">
                <div class="card-header">
                    <p>${user.name}</p>
                </div>
                <p class="job">${user.date}</p> <br>
                <p class="capt"><em>"${user.review.length > 90 ? `${user.review.substring(0, 90)}...` : user.review}"</em></p>
            </div>
        </div>
`;

const createMenuListTemplate = (menu) => `
<p>${menu.name}</p>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
  <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
  <i class="fas fa-heart" aria-hidded="true"></i>
  </button>
`;

const dataErrorTemplate = (error) => `
    <h1 class="error"> Maaf, data restoran gagal dimuat. <br> <br>
    Error Code: <i>${error}</i>.</h1>
    `;

export {
  restoListTemplate,
  detailRestoCategoryTemplate,
  userRateTemplate,
  restoDetailTemplate,
  dataErrorTemplate,
  createMenuListTemplate,
  userReviewTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  restoFavoriteTemplate,
};
