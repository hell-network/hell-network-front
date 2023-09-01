import styled from 'styled-components'

const StyledSpan = styled.span`
  background-color: #f4f4f4;
  color: black;
  padding: 3px 7px;
  line-height: 2em;
  border-right: solid 1px;
  border-bottom: solid 1px;
  border-radius: 10px;
  font-weight: 600;

  &::before {
    margin-right: 10px;
    content: '🌍';
    display: inline-block;
    width: 10px;
    border-radius: 40px;
    height: 10px;
  }

  &[data-tag='Source']::before {
    content: '📚';
    display: inline-block;
    width: 10px;
    border-radius: 40px;
    height: 10px;
    margin-right: 10px;
  }

  &[data-tag='Source'] {
    background-color: #ddf4d6;
    color: #252422;
    padding: 3px 7px;
    line-height: 2em;
    border-radius: 10px;
    font-weight: 600;
  }
`

const Tag = ({ dataTag = 'source', name = '' }) => {
  return <StyledSpan data-tag={dataTag}>{name}</StyledSpan>
}

export default Tag
