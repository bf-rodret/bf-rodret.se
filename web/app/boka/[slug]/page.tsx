import groq from 'groq';
import {client} from 'client';
import PageHeader from 'components/page-header';
import MainNavigation from 'components/main-navigation';
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type.js';
import {Breadcrumb} from 'types/Breadcrumb';
import {ResourceCalendar} from 'components/calendar';

const query = groq`{
  "resource": *[_type == "resource" && slug.current == $slug][0]{
    ...
  },
  "member": *[_type == "member" && _id == "b51a2095-a4a7-4295-b968-f2893afc3475"][0]{
    ...
  },
  "bookings": *[_type == "booking" && $slug in [resource->slug.current]]{
    "id": _id,
    "title": member->name,
    "start": startDate,
    "end": endDate,
  }
}`

async function getData(slug: string) {
	const data = await client.fetch(query, { slug })
	//const tocData = await getTocDataForPageType('informationArticle', article._id);

	return data;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pages = await client.fetch(groq`*[_type == "resource"]{ "slug": slug.current }`);
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function ResourcePage({params}) {
  const { slug } = params;
	const data = await getData(slug);

  //console.log(data);

  const bookings = [];
  data.bookings.map((booking) => {
    bookings.push({
      id: booking.id,
      title: booking.title || "Bokat",
      start: new Date(booking.start),
      end: new Date(booking.end),
      resourceId: data.resource._id
    })
  });

  return (
  	<div className="booking-page">
	    <PageHeader pageTitle={data.resource.title}></PageHeader>
      <div className="bookings">
        <div className="member-card">
          Hej {data.member.name}!
        </div>
        <div className="bookings-calendar">
          <ResourceCalendar
            bookings={bookings}
            start={data.resource.slotsStart}
            end={data.resource.slotsEnd}
          />
        </div>
      </div>
	  </div>
  )

}
