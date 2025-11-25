import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function MovieList({ type, title, emoji }) {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]); //필터된 영화들을 저장
  const [minRating, setMinRating] = useState(0); //최소 평점
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchMovies();
  }, [type]); //처음 시작시 한번 fetchMovies 실행
  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${
        import.meta.env.VITE_themoviedb_api_key
      }&language=ko`
    );
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results);
  };
  //평점 필터링 함수
  const handleFilter = (rate) => {
    if (minRating === rate) {
      setMinRating(0); //같은 평점을 두번 눌렀을때 처음으로 초기화
      setFilterMovies(movies);
    } else {
      setMinRating(rate); //최소 평점 설정
      //최소평점 이상의 영화들만 필터링
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };
  //by, order 값이 바뀔때마다 state에 업데이트
  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  console.log(sort);
  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]); //sort 값이 바뀔때마다 정렬 실행

  return (
    <section id={`${type}`} className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title} <img src={emoji} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li
              className={
                minRating === 8
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(8)}
            >
              8+ Star
            </li>
            <li
              className={
                minRating === 7
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(7)}
            >
              7+ Star
            </li>
            <li
              className={
                minRating === 6
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(6)}
            >
              6+ Star
            </li>
          </ul>

          <select
            name="by"
            id="by"
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="default">정렬방법</option>
            <option value="release_date">날짜순</option>
            <option value="vote_average">평점순</option>
          </select>
          <select
            name="order"
            id="order"
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {/* movies에 있는 데이터 만큼 MovieCard를 만들어라 */}
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
