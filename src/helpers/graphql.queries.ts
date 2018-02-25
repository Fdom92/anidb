export const  animeList = `
  query ($page: Int, $perPage: Int, $averageScore_greater: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (averageScore_greater: $averageScore_greater) {
        id
        coverImage {
          large
          medium
        }
        title {
          romaji
        }
      }
    }
  }
  `;

export const  animeDetails = `
  query ($id: Int) {
    Media (id: $id) {
      id
      description
      averageScore
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      title {
        romaji
      }
      coverImage {
        large
        medium
      }
      bannerImage
      nextAiringEpisode {
        airingAt
        episode
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
      trailer {
        id
        site
      }
      characters {
        nodes {
          id
          name {
            first
            last
          }
          image {
            large
            medium
          }
          description
        }
      }
      genres
    }
  }
`;
