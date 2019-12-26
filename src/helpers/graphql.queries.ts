export const animeList = `
query ($page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(search: $search, isAdult: false) {
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
}`;

export const animeDetails = `
query ($id: Int) {
  Media(id: $id) {
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
    season
    episodes
    duration
    chapters
    volumes
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
      edges {
        node {
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
        role
        voiceActors {
          id
          name {
            first
            last
          }
        }
      }
    }
    genres
  }
}`;

export const animeFilteredList = `
query ($page: Int, $perPage: Int, $format: MediaFormat, $season: MediaSeason, $seasonYear: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(format: $format, season: $season, seasonYear: $seasonYear, isAdult: false) {
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
}`;
