import { useEffect, useState } from 'react';
// import { fetchNews } from '../../utils/api';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import s from './NewsPage.module.scss';

import newArr from './news.json';

const NewsPage = () => {
  const [news, setNews] = useState(newArr);
  const [searchQuery, setSearchQuery] = useState('');
  // const [queriedNews, setQueriedNews] = useState([]);

  // console.log(newArr);

  // запуститься на стадії монтування компонента
  // useEffect(() => {
  //   fetchNews()
  //     .then(news => setNews(news))
  //     .catch(err => console.log(err));
  // }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  let queriedNews = [];

  if (searchQuery && news) {
    const normalizeSearchQuery = searchQuery.toLowerCase();

    console.log(news);

    queriedNews = news.filter(el =>
      el.title.toLowerCase().includes(normalizeSearchQuery)
    );

    console.log(queriedNews);

    return queriedNews;
  }

  return (
    <>
      <h1 className={s.title}>News</h1>

      {/* need to use  NoticeSearch Component*/}
      <NewsSearch onSubmit={onSubmitSearch} />

      {/* <form className={s.form}>
        <input type="text" placeholder="Search" className={s.input}></input>
        <button type="submit" className={s.btn}></button>
      </form> */}

      {/* NEWS body */}
      {/* <NewsList news={searchQuery ? queriedNews : news} /> */}
      <NewsList news={newArr} />

      {/* <ul className={s.list}>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності. З початком теплої пори року активізуються кліщі, і треба
            бути уважним, щоб уберегти свого песика чи котика від дуже серйозних
            неприємностей зі здоров`ям.
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            iste earum accusantium natus unde ad nulla, animi maiores in
            corporis.
          </h2>
          <p className={s.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis iure
            magni perferendis voluptatem ex? Quasi, dolorum nemo. Amet voluptate
            praesentium mollitia illo sit suscipit consequatur, optio accusamus
            eaque iste fugit, exercitationem animi saepe eos nam veniam est. Qui
            ab, deserunt beatae asperiores veniam voluptatum saepe perspiciatis
            cumque vero? Quam praesentium, minus voluptatem neque, in dicta
            accusantium vero, eos est necessitatibus atque dignissimos sit quis
            consequatur! Distinctio praesentium illum vel, nostrum nihil esse
            voluptates cum molestiae nisi blanditiis excepturi facere sint
            velit? Praesentium suscipit earum voluptatum voluptatibus eaque,
            facere, distinctio impedit quo, laudantium laborum error. Quibusdam
            ipsam quas impedit minus dolore!
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності. З початком теплої пори року активізуються кліщі, і треба
            бути уважним, щоб уберегти свого песика чи котика від дуже серйозних
            неприємностей зі здоров`ям.
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності. З початком теплої пори року активізуються кліщі, і треба
            бути уважним, щоб уберегти свого песика чи котика від дуже серйозних
            неприємностей зі здоров`ям.
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності. З початком теплої пори року активізуються кліщі, і треба
            бути уважним, щоб уберегти свого песика чи котика від дуже серйозних
            неприємностей зі здоров`ям.
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності. З початком теплої пори року активізуються кліщі, і треба
            бути уважним, щоб уберегти свого песика чи котика від дуже серйозних
            неприємностей зі здоров`ям.
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
        <li className={s.item}>
          <h2 className={s.subtitle}>Обережно, кліщі! Як уберегти улюбленця</h2>
          <p className={s.text}>
            Травневі прогулянки з улюбленцем не лише приємні, але й потребують
            пильності. З початком теплої пори року активізуються кліщі, і треба
            бути уважним, щоб уберегти свого песика чи котика від дуже серйозних
            неприємностей зі здоров`ям.
          </p>
          <div className={s.addData}>
            <p className={s.date}>20/02/2021</p>
            <a
              href="https://htmlreference.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Read more
            </a>
          </div>
        </li>
      </ul> */}
    </>
  );
};

export default NewsPage;
