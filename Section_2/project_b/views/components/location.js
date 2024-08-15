export default function renderLocation(location, isAvailableLocation = true) {
  let attributes;

  if(isAvailableLocation) {
    attributes = `
      hx-post="/places"
      hx-vals='{"locationId": "${location.id}"}'
      hx-target="#interesting-locations"
      hx-swap="afterbegin show:#int-location-section:top"
      hx-on::before-request="showConfirmationModal()"
      data-action="add"
    `
  } else {
    attributes = `
    hx-delete="/places/${location.id}"
    hx-target="closest li"
    hx-swap="outerHTML show:bottom"
    hx-on::before-request="showConfirmationModal()"
    data-action="remove"

    `
  }

  return `
    <li class="location-item">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
