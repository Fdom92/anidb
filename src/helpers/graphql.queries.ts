export const  animeList = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
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
      type
      format
      status
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
