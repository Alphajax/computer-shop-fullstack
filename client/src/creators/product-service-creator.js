import Laptop from "../components/products/laptop";
import LaptopService from "../services/laptop-service";
import Monoblock from "../components/products/monoblock";
import MonoblockService from "../services/monoblock-service";
import Tablet from "../components/products/tablet";
import TabletService from "../services/tablet-service";

const createProductService = (type) => {
  switch (type) {
      case 'laptop':
          return [ Laptop, new LaptopService() ];
      case 'monoblock':
          return [ Monoblock, new MonoblockService() ];
      case 'tablet':
          return [ Tablet, new TabletService() ];
      case 'empty':
          return [null, undefined];
  }
};

export default createProductService;
