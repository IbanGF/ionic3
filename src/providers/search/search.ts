
export class SearchProvider {

  selectedSecondaryTab: string;
  placesQuery: object;
  spotsQuery: object;
  bounds: object;
  formatted_address: string;

  constructor() {
    this.selectedSecondaryTab = 'places';
    this.formatted_address = '';
    this.bounds = {
      southwest: [0.19748888593744596, 41.14594933613824],
      northeast: [6.536600214062446, 45.943861212538316]
    };
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
