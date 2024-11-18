import Form from 'react-bootstrap/Form';

function SelectRegion () {
  return (
    <Form.Select aria-label="Default select example">
      <option>Select a Region</option>
      <option value="52.377956, 4.897070">Amsterdam</option>
      <option value="51.509865, -0.118092">London</option>
      <option value="-33.918861, 18.423300">Cape Town</option>
      <option value="48.210033, 16.363449">Vienna</option>
      <option value="48.864716, 2.349014">Paris</option>
    </Form.Select>
  );
}

export default SelectRegion;
