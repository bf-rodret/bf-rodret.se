import groq from 'groq';
import {client} from 'client';
import PageHeader from 'components/page-header';
import MainNavigation from 'components/main-navigation';
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type.js';
import {Breadcrumb} from 'types/Breadcrumb';
import moment from 'moment';

const query = groq`{
  "rentals": *[_type == "garageParkingSlotRental"]{
    ...,
    garageParkingSlot -> { ... },
    member -> { ... }
  },
  "slots": *[_type == "garageParkingSlot"]{
    ...
  },
}`

async function getData() {
	const data = await client.fetch(query)
	//const tocData = await getTocDataForPageType('informationArticle', article._id);

	return data;
}

export default async function ResourcePage({}) {
	const data = await getData();

  //console.log(data.rentals);

  const rentedIds = [];
  let activeRentals = data.rentals.filter((rental) => {
    if (rental.garageParkingSlot) {
      rentedIds.push(rental.garageParkingSlot.id);
      return true;
    }
    return false;
  });
  activeRentals = activeRentals.sort((a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);
    return aDate > bDate ? 1 : -1;
  });

  const slotsCount = data.slots.length;

  const unrentedSlots = data.slots.filter((slot) => {
    return !rentedIds.includes(slot.id);
  });

  let queue = data.rentals.filter((rental) => {
    return !rental.garageParkingSlot;
  })

  queue = queue.sort((a, b) => {
    const aDate = new Date(a.queueDate);
    const bDate = new Date(b.queueDate);
    return aDate > bDate ? 1 : -1;
  });

  const lastActivatedRental = activeRentals[activeRentals.length - 1];

  const lastActivatedRentalDate = new Date(lastActivatedRental.startDate);
  const lastActivatedRentalQueueStartDate = new Date(lastActivatedRental.queueDate);
  const waitingTime = moment(lastActivatedRentalDate).diff(moment(lastActivatedRentalQueueStartDate), "months");

  return (
  	<div className="article-page">
	    <PageHeader pageTitle="Garage"></PageHeader>
      <article className="article">
        <div className="lead">
          Föreningen har {slotsCount} garageplatser. Dessa fördelas enligt ett kösystem.
        </div>
        <div className="rich-text">
          <h2>Fördelning av garageplatser</h2>
          <p>
            När en medlem säger upp en bilplats skickar garageansvarig ett mejl till samtliga 
            medlemmar med bilplats. I mejlet informerar garageansvarig om att det finns en ledig
            plats. Garageansvarig ber i mejlet att de medlemmar med bilplats som vill byta till 
            den lediga platsen inkommer med ett önskemål om detta i ett mejl inom fem dagar. 
            Garageansvarig erbjuder sedan den medlem som har anmält bytesintresse och har hyrt 
            en bilplats under längst sammanhängande tid att byta till den lediga platsen.
          </p>

          <p>
            Förfrågan om att ta över den lediga plats som i sin tur kan uppstå går till nästa 
            medlem med längst hyrestid och så vidare. Även detta gör garageansvarig genom ovanstående 
            rutin.
          </p>

          <p>
            Den lediga bilplats som uppstår sist i byteskedjan erbjuds sedan till den medlem 
            som står först i kö till en bilplats.
          </p>

          <h2>Platser</h2>

          <table>
            <thead>
              <tr>
                <th>Plats</th>
                <th>Typ</th>
                <th>Medlem</th>
                <th>Internköplats</th>
              </tr>
            </thead>
            <tbody>
              {activeRentals.map((rental, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {rental.garageParkingSlot?.id}
                    </td>
                    <td>
                      {rental.garageParkingSlot.type == "car" ? "Bil" : "MC"}
                    </td>
                    <td>
                      {rental.member?.shortName}
                    </td>
                    <td>{index + 1}</td>
                  </tr>
                )
              })}
              {unrentedSlots.map((slot, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {slot.id}
                    </td>
                    <td>
                      {slot.type == "car" ? "Bil" : "MC"}
                    </td>
                    <td>
                      <i>LEDIG</i>
                    </td>
                    <td></td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <h2>Kö</h2>
          <table>
            <thead>
              <tr>
                <th>Medlem</th>
                <th>Köstart</th>
                <th>Köplats</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((rental, index) => {
                const queueDate = new Date(rental.queueDate);
                return (
                  <tr key={index}>
                    <td>
                      {rental.member?.shortName}
                    </td>
                    <td>
                      {queueDate.toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "long"
                      })}
                    </td>
                    <td>{index + 1}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <p>
            Kötid? Senaste gången en plats i garaget förmedlades var i{" "}
            {lastActivatedRentalDate.toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "long"
            })}. 
            Den medlem som då fick plats hade stått i kö i {waitingTime} månader.
          </p>


          <h2>Regler</h2>
          <p>
            Medlemmar kan inte byta bilplatser sinsemellan utan lediga platser som uppstår måste garageansvarig alltid först erbjuda samtliga de medlemmar som redan hyr en bilplats.
          </p>
          <p>
            Medlem kan enbart inneha två eller fler garageplatser om det inte finns köande medlemmar till platserna. När det uppstår en kö ska den som innehar två garageplatser avsäga sig den ena platsen (valfri). Den lediga platsen erbjuds den medlem som står först i kön.
          </p>
          <p>
            Medlemmar får inte hyra ut platser till varandra mot ekonomisk ersättning. Men en
            medlem får låna ut sin garageplats till annan medlem upp till en månad utan ersättning.
          </p>
        </div>
      </article>
	  </div>
  )

}
