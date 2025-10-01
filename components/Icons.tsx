function ContactIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        stroke="#636A76"
        strokeWidth={1.5}
      />
      <path
        d="M7 9h10"
        stroke="#636A76"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M7 13h5"
        stroke="#636A76"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function PropertyIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 10.5 12 4l8 6.5v8.5a1 1 0 0 1-1 1h-5.5V14h-3v6.5H5a1 1 0 0 1-1-1v-8.5Z"
        stroke="#636A76"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RentIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 9h16"
        stroke="#636A76"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x="6.5"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="#636A76"
        strokeWidth={1.5}
      />
      <path
        d="M9.5 6.5 12 4l2.5 2.5"
        stroke="#636A76"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function MediaIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2"
        stroke="#636A76"
        strokeWidth={1.5}
      />
      <path
        d="M8.5 10.5a2 2 0 1 1 3 1.732M11.5 12.232 16 15.5"
        stroke="#636A76"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export { ContactIcon, PropertyIcon, RentIcon, MediaIcon };
