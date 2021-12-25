import styled, { css } from 'styled-components'

const Hidden = css`
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0,0,0,0) !important;
    white-space: nowrap !important;
    border: 0 !important;
`

export const HiddenLabel = styled.span`
    ${Hidden}
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    ${Hidden}
`