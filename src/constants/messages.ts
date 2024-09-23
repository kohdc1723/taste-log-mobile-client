export const ALERTS = {
  LOCATION: {
    TITLE: "This app needs permission to access your location.",
    DESCRIPTION: "Please enable location access permissions in the Settings."
  },
  PHOTO: {
    TITLE: "This app needs permission to access your photo.",
    DESCRIPTION: "Please enable photo access permissions in the Settings."
  },
  LOCATION_NOT_SELECTED: {
    TITLE: "Please select a location.",
    DESCRIPTION: "Long press the map to select location."
  }
} as const;

export const ERROR_MESSAGES = {
  CANNOT_GET_ADDRESS: "Cannot get address."
} as const;