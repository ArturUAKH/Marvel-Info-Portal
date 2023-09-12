import imgHeroes from '../../resources/img/heroes.png';
import './banner.scss';

let Banner = () => {
    return (
        <div className="banner__heroes">
            <img src={imgHeroes} alt="HeroesBackground" />
        </div>
    );
};

export default Banner;
