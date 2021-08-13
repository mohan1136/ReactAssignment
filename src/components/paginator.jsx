import _ from "lodash";
export default function paginator(props) {
  let { tempCharacterData, currentPage, pageSize } = props;
  let startIndex = (currentPage - 1) * pageSize;
  return _(tempCharacterData).slice(startIndex).take(pageSize).value();
}
