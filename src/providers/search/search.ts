
export class SearchProvider {

  placesQuery: object;
  spotsQuery: object;

  constructor() {
    this.placesQuery = {
      date: {},
      propertyTypes: [],
      privacyTypes: [],
      engagements: [],
      equipments: {},
      services: [],
      rules: [],
      amenities: [],
      beds: [],
      price: {
        min: 0,
        max: 2000
      },
      page: 1
    };
    this.spotsQuery = {
      sortBy: {
        'creation': "desc"
      },
      page: 1
    };
  }

  getPlacesQuery() {
    return this.placesQuery;
  }

  setPlacesQuery(placesQuery) {
    this.placesQuery = placesQuery;
  }

  getSpotsQuery() {
    return this.spotsQuery;
  }

  setSpotsQuery(spotsQuery) {
    this.spotsQuery = spotsQuery;
  }

}
