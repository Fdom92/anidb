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
        id,
        coverImage {
          large,
          medium
        },
        title {
          romaji
        }
      }
    }
  }
  `;

export const  animeDetails = `
  query ($page: Int, $perPage: Int, $id: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id) {
        id,
        description,
        averageScore,
        startDate {
          year,
          month,
          day
        },
        endDate {
          year,
          month,
          day
        },
        title {
          romaji
        },
        coverImage {
          large,
          medium
        },
        bannerImage,
        nextAiringEpisode {
          airingAt,
          episode
        },
        streamingEpisodes {
          title,
          thumbnail,
          url,
          site
        },
        trailer {
          id,
          site
        }
      }
    }
  }
`;
