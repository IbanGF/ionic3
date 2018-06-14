
export class SearchProvider {

  selectedSecondaryTab: string;
  formatted_address: string;
  bounds: object;
  selectedHobbies: Array<string>;
  defaultPlacesQuery: object;
  placesQuery: any;
  defaultSpotsQuery: object;
  spotsQuery: any;

  constructor() {
    this.selectedSecondaryTab = 'places';
    this.formatted_address = '';
    this.bounds = {
      southwest: [0.19748888593744596, 41.14594933613824],
      northeast: [6.536600214062446, 45.943861212538316]
    };
    this.selectedHobbies = [];
    this.defaultPlacesQuery = {
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
    this.placesQuery = this.defaultPlacesQuery;
    this.defaultSpotsQuery = {
      sortBy: {
        'creation': "desc"
      },
      page: 1
    };
    this.spotsQuery = this.defaultSpotsQuery;
  }

  getSelectedSecondaryTab() {
    return this.selectedSecondaryTab;
  }

  setSelectedSecondaryTab(selectedSecondaryTab) {
    this.selectedSecondaryTab = selectedSecondaryTab;
  }

  getAddress() {
    return this.formatted_address;
  }

  setAddress(formatted_address) {
    this.formatted_address = formatted_address;
  }

  getBounds() {
    return this.bounds;
  }

  setBounds(bounds) {
    this.bounds = bounds;
  }

  getSelectedHobbies() {
    return this.selectedHobbies;
  }

  setSelectedHobbies(selectedHobbies) {
    this.selectedHobbies = selectedHobbies;
    this.placesQuery.selectedHobbies = selectedHobbies;
    this.spotsQuery.selectedHobbies = selectedHobbies;
  }

  getPlacesQuery() {
    return this.placesQuery;
  }

  setPlacesQuery(placesQuery) {
    this.placesQuery = placesQuery;
  }

  resetPlacesQuery() {
    this.placesQuery = this.defaultPlacesQuery;
  }

  getSpotsQuery() {
    return this.spotsQuery;
  }

  setSpotsQuery(spotsQuery) {
    this.spotsQuery = spotsQuery;
  }

  resetSpotsQuery() {
    this.spotsQuery = this.defaultSpotsQuery;
  }

}
