import { Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

const Soccer = (
  <img
    alt="soccer"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACKUlEQVRIie3Wz0sVURQH8I/9ghbWRsQyLXe1ziRautUsCFq1kKJFqSSIf4aLoCAhKNpEgVFRtvYfcBsl6iLNFi0qV/ay12KuzXTfzLz3NFz5hcswc77nfO89c+65lz3sElqa4HbhEgZwKrzDJyzjLV5h5X9NrhPTqKBaZ2ziOU7uVHQIP0LQn5jFRo7gBt4FTjX4XNyu6JhkBVXMSFPbi4WM6EL4Bt14IV39aLOiQ8FxE3dy7K14EkZrjn0849/wyjul6R1vbr414lV8x7FGHB5K09i/A+H+TJzpeuQu/Mo43C/g1Us13MvEqUgyWYgx/1brGvZHnF58zHCWcSHi7MPnKNbtMuFZtVulL9haMKl4O01KG1JfDudNmfCHKNhEJthUTrB4TGUmORFN8n2Z8HogLeF8ZLvRgPD1yOdsZjHrZcJb26g9x9amvG1WAidGu7Sb/cW+iLQWnkdyAnzFXMmk5wInxtHwXC0TXgzPcwXBZ0qEi2xbsRYL7GBEkpanBfYOaf+OT6WOAp9ngXOrTPiE5F9tSA+FnaA7xKppIAci4goe4SYe4HHGVsHLOkKXcTDzPoxDkpa5muuRwXFpdcfjdInfmQKfb3J+Q1xcJK3uquS/xbhSIpxn+41r+FLiV4NRtYU0X8KfV1twI80IZjEoOU+zAYfRg8Nh9IRvcXoHtiu6hTbc1dhlryIppLoHfzPX207JlWhQssrs9XZJcr19rYHq3cOu4g9XbeD3FUpqLAAAAABJRU5ErkJggg=="
  ></img>
);

const Loading = () => (
  <Center height={"100vh"}>
    <Spinner
      thickness="4px"
      speed="0.45s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Center>
);

export { Loading, Soccer };
