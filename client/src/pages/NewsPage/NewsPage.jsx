import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchNews } from '../../utils/api';
import { showInfoMessage } from '../../utils/showMessages';
import filterArrByTitle from '../../utils/filterArrByTitle';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import s from './NewsPage.module.scss';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    fetchNews()
      .then(news => {
        setNews(news);
        if (news === []) {
          showInfoMessage(t('errors.noNews'));
        }
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const onInputChange = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <h2 className={s.title}>{t('titles.newsPage')}</h2>

      <NewsSearch onSubmit={onSubmitSearch} news={news} onChange={onInputChange} />

      {isLoading ? (
        <Loader />
      ) : (
        <NewsList news={searchQuery !== '' ? filterArrByTitle(news, searchQuery) : news} />
      )}

      {/* {filterArrByTitle(news, searchQuery).length !== 0 && <p>Not Found</p>} */}
    </Container>
  );
};

export default NewsPage;
