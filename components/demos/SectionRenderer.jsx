import ServicesOrMenu from "./ServicesOrMenu";
import PriceList from "./PriceList";
import Gallery from "./Gallery";
import Team from "./Team";
import HoursLocation from "./HoursLocation";
import EnquiryForm from "./EnquiryForm";
import Steps from "./Steps";
import FAQSection from "./FAQSection";
import CalloutBar from "./CalloutBar";
import InfoBlock from "./InfoBlock";
import Events from "./Events";
import Timetable from "./Timetable";
import Rooms from "./Rooms";
import Products from "./Products";

// Maps a config section's `type` to its component — the only place that
// needs to change when a new section type is added. Everything else about
// a demo (lib/demos.js) is just data.
const SECTION_COMPONENTS = {
  services: ServicesOrMenu,
  priceList: PriceList,
  gallery: Gallery,
  team: Team,
  hours: HoursLocation,
  form: EnquiryForm,
  steps: Steps,
  faq: FAQSection,
  callout: CalloutBar,
  info: InfoBlock,
  events: Events,
  timetable: Timetable,
  rooms: Rooms,
  products: Products,
};

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = SECTION_COMPONENTS[section.type];
        if (!Component) return null;
        // Sections are a static, order-stable config array with no id of
        // their own, so the type+index pair is a safe, stable React key.
        return <Component key={`${section.type}-${i}`} {...section.props} />;
      })}
    </>
  );
}
