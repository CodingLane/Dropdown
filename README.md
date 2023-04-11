<!-- Improved compatibility of back to top link: See: https://github.com/CodingLane/dropdown/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CodingLane/dropdown">
    <img src="public/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">React Dropdown</h3>

  <p align="center">
    An easy to use react dropdown for your project!
    <br />
    <a href="https://github.com/CodingLane/dropdown#readme"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CodingLane/dropdown/issues">Report Bug</a>
    ·
    <a href="https://github.com/CodingLane/dropdown/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#properties">Properties</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

There are many ways to create a dropdown for react. Personally I was not satisfied with either of them,
so I decided to create my own, easy to use dropdown component for react.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

All you have to do to use the package is to install it.

-   npm
    ```sh
    npm install @codinglane/dropdown
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

There are many use cases possible.

If you want to see the different use cases, run `npm start` inside the dropdown package.

_For further information, go to the [Properties](#properties) section_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Properties

| Prop               | Type                                                    | Default     | Description                                                                                                                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `string`                                                | `undefined` | The current id of the dropdown                                                                                                                                                                                                                                                                                       |
| `value`            | `T`                                                     | `undefined` | The current chosen value for the dropdown, typeof string. The value is not getting managed inside the component. You have to provide a function to manage the current chosen value.                                                                                                                                  |
| `searchable`       | `boolean`                                               | `false`     | Set this value to true, if you want to have a dropdown with an input field to search for an specific option.                                                                                                                                                                                                         |
| `className`        | `string`                                                | `undefined` | Set the classname of the dropdown, if you want to set your custom style.                                                                                                                                                                                                                                             |
| `closeOnSelect`    | `boolean`                                               | `false`     | Set this value to true, if you want that the options menu is getting closed as soon as an option is clicked.                                                                                                                                                                                                         |
| `favorites`        | `Array<string>`                                         | `undefined` | Set this to a string array of the field values, to have options grouped by favorites. Set it to an empty array, if you want to have the functionality but do not have any favorites at the moment. The favorites are getting manage outside this component. You have to provide a function to manage your favorites. |
| `fields`           | `Array<DropdownOptions>; Array<GroupedDropdownOptions>` | `[]`        | These are the possible options for the dropdown. If you want to have grouped dropdown options, set the type of the fields to GroupedDropdownOptions and set the group tag for all of them.                                                                                                                           |
| `placeholder`      | `string`                                                | `undefined` | The placeholder for the dropdown field. When the placeholder is set and the value is undefined or not assignable to any field, the placeholder is getting showed.                                                                                                                                                    |
| `onChange`         | `Function`                                              | `()=>void`  | The function to manage the current chosen value for the dropdown.                                                                                                                                                                                                                                                    |
| `onBlur`           | `Function`                                              | `undefined` | This function is getting called on blur of the options menu.                                                                                                                                                                                                                                                         |
| `onFocus`          | `Function`                                              | `undefined` | This function is getting called on focus of the options menu.                                                                                                                                                                                                                                                        |
| `onFavorizeOption` | `Function`                                              | `undefined` | The onFavorizeOption is getting called as soon as the favorize icon in the option menu is getting clicked for an option. This dropdown do not manage the favorites on its own. You have to manage the favorizes to see changes in the component.                                                                     |
| `data-testid`      | `string`                                                | `undefined` | For testing purpose.                                                                                                                                                                                                                                                                                                 |

## Types

| Type                     | PropertyName | PropertyType |
| ------------------------ | ------------ | ------------ |
| `DropdownOptions`        | `value`      | `string`     |
|                          | `label`      | `string`     |
|                          | `favorite`   | `boolean`    |
| `GroupedDropdownOptions` | `value`      | `string`     |
|                          | `label`      | `string`     |
|                          | `favorite`   | `boolean`    |
|                          | `group`      | `string`     |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Contributions are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/CodingLane/dropdown](https://github.com/CodingLane/dropdown)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/CodingLane/dropdown.svg?style=for-the-badge
[contributors-url]: https://github.com/CodingLane/dropdown/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CodingLane/dropdown.svg?style=for-the-badge
[forks-url]: https://github.com/CodingLane/dropdown/network/members
[stars-shield]: https://img.shields.io/github/stars/CodingLane/dropdown.svg?style=for-the-badge
[stars-url]: https://github.com/CodingLane/dropdown/stargazers
[issues-shield]: https://img.shields.io/github/issues/CodingLane/dropdown.svg?style=for-the-badge
[issues-url]: https://github.com/CodingLane/dropdown/issues
[license-shield]: https://img.shields.io/github/license/CodingLane/dropdown.svg?style=for-the-badge
[license-url]: https://github.com/CodingLane/dropdown/blob/master/LICENSE.txt
