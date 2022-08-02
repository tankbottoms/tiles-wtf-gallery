import { ProviderRpcErrorCode, SofiaProRegular } from '@web3-onboard/common';
import {
	BehaviorSubject,
	Subject,
	defer,
	firstValueFrom,
	fromEventPattern,
	takeUntil as takeUntil$1,
	merge as merge$1
} from 'rxjs';
import {
	distinctUntilKeyChanged,
	pluck,
	filter,
	shareReplay,
	withLatestFrom,
	take,
	takeUntil,
	share,
	switchMap,
	mapTo,
	skip,
	debounceTime,
	distinctUntilChanged,
	startWith
} from 'rxjs/operators';
import {
	locale as locale$1,
	_,
	addMessages,
	init as init$2,
	getLocaleFromNavigator
} from 'svelte-i18n';
import bowser from 'bowser';
import { nanoid } from 'nanoid';
import Joi from 'joi';
import BigNumber from 'bignumber.js';
import { get as get$1 } from 'svelte/store';
import partition from 'lodash.partition';
import { utils, providers, BigNumber as BigNumber$1 } from 'ethers';
import merge from 'lodash.merge';
import EventEmitter from 'eventemitter3';

var ethereumIcon = `
  <svg height="100%" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.99902 0.12619V5.20805L9.58065 7.12736L4.99902 0.12619Z" fill="white" fill-opacity="0.602"/>
    <path d="M4.99923 0.12619L0.416992 7.12736L4.99923 5.20805V0.12619Z" fill="white"/>
    <path d="M4.99902 10.4207V13.8737L9.58371 7.92728L4.99902 10.4207Z" fill="white" fill-opacity="0.602"/>
    <path d="M4.99923 13.8737V10.4201L0.416992 7.92728L4.99923 13.8737Z" fill="white"/>
    <path d="M4.99902 9.62134L9.58065 7.12739L4.99902 5.20923V9.62134Z" fill="white" fill-opacity="0.2"/>
    <path d="M0.416992 7.12739L4.99923 9.62134V5.20923L0.416992 7.12739Z" fill="white" fill-opacity="0.602"/>
  </svg>
`;

var polygonIcon = `
  <svg width="100%" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5091 4.05856C10.2585 3.91901 9.9362 3.91901 9.64974 4.05856L7.64453 5.20986L6.28385 5.94251L4.31445 7.09382C4.0638 7.23337 3.74154 7.23337 3.45508 7.09382L1.91536 6.18673C1.66471 6.04718 1.48568 5.76807 1.48568 5.45408V3.70968C1.48568 3.43057 1.62891 3.15147 1.91536 2.97703L3.45508 2.10483C3.70573 1.96527 4.02799 1.96527 4.31445 2.10483L5.85417 3.01192C6.10482 3.15147 6.28385 3.43057 6.28385 3.74457V4.89587L7.64453 4.12833V2.94214C7.64453 2.66304 7.5013 2.38393 7.21484 2.20949L4.35026 0.569752C4.09961 0.4302 3.77734 0.4302 3.49089 0.569752L0.554687 2.24438C0.268229 2.38393 0.125 2.66304 0.125 2.94214V6.22162C0.125 6.50072 0.268229 6.77983 0.554687 6.95427L3.45508 8.59401C3.70573 8.73356 4.02799 8.73356 4.31445 8.59401L6.28385 7.47759L7.64453 6.71005L9.61393 5.59363C9.86458 5.45408 10.1868 5.45408 10.4733 5.59363L12.013 6.46583C12.2637 6.60539 12.4427 6.88449 12.4427 7.19848V8.94289C12.4427 9.22199 12.2995 9.50109 12.013 9.67553L10.5091 10.5477C10.2585 10.6873 9.9362 10.6873 9.64974 10.5477L8.11002 9.67553C7.85937 9.53598 7.68034 9.25688 7.68034 8.94289V7.82647L6.31966 8.59401V9.74531C6.31966 10.0244 6.46289 10.3035 6.74935 10.478L9.64974 12.1177C9.90039 12.2572 10.2227 12.2572 10.5091 12.1177L13.4095 10.478C13.6602 10.3384 13.8392 10.0593 13.8392 9.74531V6.43095C13.8392 6.15184 13.696 5.87274 13.4095 5.6983L10.5091 4.05856Z" fill="white"/>
  </svg>
`;

var questionIcon = `
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.07 12.85C11.84 11.46 13.32 10.64 14.18 9.41C15.09 8.12 14.58 5.71 12 5.71C10.31 5.71 9.48 6.99 9.13 8.05L6.54 6.96C7.25 4.83 9.18 3 11.99 3C14.34 3 15.95 4.07 16.77 5.41C17.47 6.56 17.88 8.71 16.8 10.31C15.6 12.08 14.45 12.62 13.83 13.76C13.58 14.22 13.48 14.52 13.48 16H10.59C10.58 15.22 10.46 13.95 11.07 12.85ZM14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18C13.1 18 14 18.9 14 20Z" fill="currentColor"/>
  </svg>
`;

var binanceIcon = `
  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.32975 5.90275L7 3.2325L9.67163 5.90413L11.2254 4.35038L7 0.125L2.776 4.349L4.32975 5.90275ZM0.125 7L1.67875 5.44625L3.2325 7L1.67875 8.55375L0.125 7ZM4.32975 8.09725L7 10.7675L9.67163 8.09587L11.2254 9.64894L7 13.875L2.776 9.651L2.77394 9.64894L4.32975 8.09725ZM10.7675 7L12.3212 5.44625L13.875 7L12.3212 8.55375L10.7675 7ZM8.57575 6.99863H8.57713V7L7 8.57713L5.42494 7.00275L5.42219 7L5.42494 6.99794L5.70062 6.72156L5.83469 6.5875L7 5.42288L8.57644 6.99931L8.57575 6.99863Z" fill="white"/>
  </svg>
`;

var fantomIcon = `
  <svg height="100%" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.26613 0.133876C5.46683 0.0457135 5.68592 0 5.90775 0C6.12958 0 6.34867 0.0457135 6.54938 0.133876L10.2679 1.9598C10.3617 1.99893 10.4437 2.05898 10.5068 2.13465C10.5699 2.21033 10.6121 2.29932 10.6298 2.3938H10.6335V11.5637C10.6245 11.6667 10.5857 11.7654 10.5213 11.8495C10.457 11.9336 10.3694 11.9998 10.2679 12.0411L6.54938 13.8656C6.34867 13.9538 6.12958 13.9995 5.90775 13.9995C5.68592 13.9995 5.46683 13.9538 5.26613 13.8656L1.54762 12.0397C1.44724 11.9979 1.36095 11.9313 1.29799 11.8472C1.23504 11.7631 1.19779 11.6646 1.19025 11.5623C1.19025 11.5465 1.19025 11.5332 1.19025 11.522V2.39205C1.20579 2.29767 1.24673 2.20852 1.30923 2.13292C1.37173 2.05733 1.45375 1.99776 1.54762 1.9598L5.26613 0.133876ZM10.0478 7.50898L6.54938 9.22396C6.34872 9.31229 6.12961 9.35809 5.90775 9.35809C5.68589 9.35809 5.46678 9.31229 5.26613 9.22396L1.77525 7.51283V11.5455L5.26613 13.2493C5.43937 13.3471 5.62982 13.4154 5.82863 13.4512L5.9085 13.4558C6.12668 13.4357 6.3373 13.3704 6.525 13.2647L10.05 11.5301V7.50898H10.0478ZM0.585375 11.3642C0.568078 11.6186 0.612957 11.8734 0.716625 12.1093C0.805331 12.2602 0.936232 12.3857 1.09538 12.4726L1.10662 12.4796C1.1505 12.5069 1.1985 12.5356 1.25663 12.5692L1.32563 12.6081L1.53675 12.7267L1.23375 13.1922L0.9975 13.0592L0.95775 13.0365C0.889125 12.9973 0.8325 12.9637 0.779625 12.9315C0.214875 12.5769 0.004125 12.1912 0 11.3887V11.3642H0.585H0.585375ZM5.61412 5.05096C5.58845 5.05933 5.5634 5.06926 5.53912 5.08071L1.82137 6.90524L1.81013 6.91119H1.80675L1.81275 6.91469L1.82137 6.91889L5.53988 8.74341C5.56405 8.75505 5.58912 8.76499 5.61487 8.77316L5.61412 5.05096ZM6.201 5.05096V8.77456C6.22675 8.76639 6.25182 8.75645 6.276 8.74481L9.9945 6.92029L10.0057 6.91434H10.0091L10.0031 6.91154L9.9945 6.90699L6.276 5.08246C6.25182 5.07083 6.22675 5.06088 6.201 5.05271V5.05096ZM10.0478 3.04479L6.71025 4.68137L10.0478 6.31795V3.04304V3.04479ZM1.77525 3.04864V6.3141L5.103 4.68137L1.77525 3.04864ZM6.27525 0.61617C6.15894 0.569406 6.03364 0.545286 5.907 0.545286C5.78036 0.545286 5.65506 0.569406 5.53875 0.61617L1.821 2.4393L1.80975 2.4449L1.80638 2.44665L1.81238 2.4498L1.821 2.45365L5.5395 4.27817C5.65571 4.32526 5.78106 4.34956 5.90775 4.34956C6.03444 4.34956 6.15979 4.32526 6.276 4.27817L9.9945 2.45365L10.0057 2.4498L10.0091 2.44805L10.0031 2.4449L9.9945 2.4407L6.27525 0.61617ZM10.5968 0.816717L10.833 0.949365L10.875 0.970015C10.9432 1.00921 10.9999 1.04316 11.0528 1.07501C11.6179 1.42851 11.8282 1.81455 11.8328 2.61709V2.64159H11.2459C11.2632 2.38703 11.2183 2.13212 11.1146 1.8961C11.0258 1.74528 10.8948 1.61983 10.7355 1.53316L10.7242 1.52616C10.6807 1.49851 10.6327 1.47016 10.5743 1.43656L10.5056 1.39981L10.2945 1.28151L10.5975 0.816017L10.5968 0.816717Z" fill="white"/>
  </svg>
`;

var optimismIcon = `
  <svg width="100%" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33611 9.25254C2.38341 9.25254 1.60287 9.02834 0.99442 8.58002C0.393974 8.1237 0.09375 7.47526 0.09375 6.63462C0.09375 6.45849 0.113782 6.2423 0.153782 5.9861C0.257909 5.40972 0.406006 4.71718 0.598133 3.9086C1.14252 1.707 2.54757 0.606201 4.81323 0.606201C5.42967 0.606201 5.98206 0.710266 6.47044 0.918394C6.95882 1.11852 7.34308 1.42278 7.62327 1.8311C7.90346 2.23135 8.04362 2.71174 8.04362 3.27212C8.04362 3.44025 8.02359 3.65241 7.98352 3.9086C7.86346 4.62111 7.71933 5.31366 7.55121 5.9861C7.27101 7.08294 6.78666 7.90354 6.09815 8.44793C5.40964 8.98431 4.489 9.25254 3.33611 9.25254ZM3.50424 7.52326C3.95262 7.52326 4.33284 7.39116 4.6451 7.12697C4.96535 6.86278 5.19351 6.45849 5.32958 5.9141C5.51371 5.16153 5.65387 4.50502 5.74993 3.94463C5.78193 3.7765 5.79793 3.60441 5.79793 3.42822C5.79793 2.6997 5.41764 2.33542 4.65713 2.33542C4.20875 2.33542 3.82449 2.46751 3.50424 2.7317C3.19205 2.99596 2.96786 3.40025 2.83179 3.94463C2.68766 4.48102 2.54354 5.13753 2.39947 5.9141C2.36741 6.07417 2.35141 6.2423 2.35141 6.41842C2.35141 7.155 2.73573 7.52326 3.50424 7.52326Z" fill="white"/>
    <path d="M8.59569 9.13247C8.50762 9.13247 8.43953 9.10443 8.39153 9.04837C8.35146 8.98431 8.33949 8.9123 8.35549 8.83224L10.0127 1.02648C10.0287 0.938417 10.0727 0.866353 10.1448 0.810289C10.2169 0.754289 10.2929 0.726257 10.373 0.726257H13.5673C14.456 0.726257 15.1685 0.910385 15.7049 1.27864C16.2493 1.64696 16.5215 2.17931 16.5215 2.87582C16.5215 3.07595 16.4975 3.28415 16.4495 3.50027C16.2493 4.42098 15.845 5.10149 15.2366 5.54181C14.6361 5.98213 13.8115 6.20229 12.7627 6.20229H11.1415L10.5892 8.83224C10.5731 8.92031 10.5291 8.99231 10.4571 9.04837C10.385 9.10443 10.3089 9.13247 10.2289 9.13247H8.59569ZM12.8468 4.54507C13.183 4.54507 13.4752 4.45298 13.7234 4.26885C13.9796 4.08472 14.1478 3.82053 14.2278 3.47627C14.2518 3.34015 14.2639 3.22008 14.2639 3.11602C14.2639 2.88383 14.1958 2.7077 14.0597 2.58763C13.9236 2.45951 13.6914 2.3955 13.3632 2.3955H11.9221L11.4658 4.54507H12.8468Z" fill="white"/>
  </svg>
`;

var avalancheIcon = `
  <svg width="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8682 0.489349H0.110352V18.4468H19.8682V0.489349Z" fill="white"/>
  </svg>
`;

var celoIcon = `
  <svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1511 8.08001C19.1511 4.11201 15.9191 0.880005 11.9511 0.880005C8.94313 0.880005 6.38313 2.70401 5.29513 5.32801C2.73513 6.41601 0.911133 8.976 0.911133 11.952C0.911133 15.92 4.14313 19.152 8.11113 19.152C11.1191 19.152 13.6791 17.328 14.7671 14.704C17.2951 13.616 19.1511 11.056 19.1511 8.08001ZM8.11113 17.36C5.13513 17.36 2.70313 14.928 2.70313 11.952C2.70313 10.256 3.50313 8.72001 4.75113 7.72801C4.75113 7.85601 4.75113 7.98401 4.75113 8.08001C4.75113 12.048 7.98313 15.28 11.9511 15.28C12.1111 15.28 12.2391 15.28 12.3991 15.28C11.3751 16.56 9.83913 17.36 8.11113 17.36ZM13.3591 13.296C12.9111 13.424 12.4311 13.488 11.9511 13.488C8.97513 13.488 6.54313 11.056 6.54313 8.08001C6.54313 7.60001 6.60713 7.15201 6.73513 6.736C7.18313 6.60801 7.66313 6.54401 8.14313 6.54401C11.1191 6.54401 13.5511 8.976 13.5511 11.952C13.5191 12.432 13.4551 12.88 13.3591 13.296ZM15.3111 12.304C15.3111 12.176 15.3111 12.048 15.3111 11.952C15.3111 7.984 12.0791 4.752 8.11113 4.752C7.95113 4.752 7.82313 4.752 7.66313 4.752C8.65513 3.472 10.1911 2.67201 11.9191 2.67201C14.8951 2.67201 17.3271 5.10401 17.3271 8.08001C17.3271 9.80801 16.5271 11.312 15.3111 12.304Z" fill="white"/>
  </svg>
`;

var gnosisIcon = `
  <svg width="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z" fill="#04795B"/>
    <path d="M11.6529 17.4492C12.2831 17.4492 12.8648 17.2392 13.3334 16.8758L9.4877 13.0316C9.12413 13.4919 8.9141 14.0734 8.9141 14.7114C8.906 16.2216 10.134 17.4492 11.6529 17.4492Z" fill="#EFEFEF"/>
    <path d="M23.0931 14.7033C23.0931 14.0734 22.8831 13.4919 22.5195 13.0234L18.6738 16.8677C19.1343 17.2311 19.716 17.4411 20.3543 17.4411C21.8651 17.4492 23.0931 16.2216 23.0931 14.7033Z" fill="#EFEFEF"/>
    <path d="M25.0322 10.528L23.3275 12.2321C23.8931 12.9105 24.2324 13.7666 24.2324 14.7195C24.2324 16.8597 22.4954 18.5961 20.3544 18.5961C19.4092 18.5961 18.5447 18.2569 17.866 17.6915L15.9998 19.5571L14.1335 17.6915C13.4549 18.2569 12.5985 18.5961 11.6451 18.5961C9.50416 18.5961 7.7672 16.8597 7.7672 14.7195C7.7672 13.7746 8.10651 12.9105 8.67206 12.2321L7.79947 11.3599L6.96736 10.528C5.99787 12.1271 5.44043 13.9927 5.44043 15.9956C5.44043 21.8265 10.1667 26.543 15.9917 26.543C21.8167 26.543 26.543 21.8185 26.543 15.9956C26.5591 13.9846 26.0017 12.119 25.0322 10.528Z" fill="#EFEFEF"/>
    <path d="M23.6338 8.71084C21.7191 6.6999 19.0045 5.44 15.9991 5.44C12.9937 5.44 10.2872 6.6999 8.36435 8.71084C8.10584 8.98545 7.85539 9.27617 7.62109 9.575L15.991 17.9419L24.361 9.56695C24.1509 9.27617 23.9005 8.97734 23.6338 8.71084ZM15.9991 6.81297C18.4713 6.81297 20.7658 7.76593 22.4866 9.50231L15.9991 15.9874L9.5116 9.50231C11.2405 7.76593 13.5269 6.81297 15.9991 6.81297Z" fill="#EFEFEF"/>
  </svg>
`;

var harmonyOneIcon = `
  <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5484 1.04102e-06C11.6346 -0.000708404 10.7578 0.361217 10.1105 1.00633C9.46322 1.65145 9.09835 2.52703 9.096 3.44089V7.256C8.74045 7.28 8.37689 7.29511 8 7.29511C7.62311 7.29511 7.26133 7.31022 6.904 7.33156V3.44089C6.88946 2.53496 6.51938 1.67105 5.87358 1.03553C5.22779 0.400017 4.35805 0.0438409 3.452 0.0438409C2.54595 0.0438409 1.67621 0.400017 1.03042 1.03553C0.384623 1.67105 0.0145378 2.53496 0 3.44089V12.5591C0.0145378 13.465 0.384623 14.329 1.03042 14.9645C1.67621 15.6 2.54595 15.9562 3.452 15.9562C4.35805 15.9562 5.22779 15.6 5.87358 14.9645C6.51938 14.329 6.88946 13.465 6.904 12.5591V8.744C7.25956 8.72 7.62311 8.70489 8 8.70489C8.37689 8.70489 8.73867 8.68978 9.096 8.66845V12.5591C9.11054 13.465 9.48062 14.329 10.1264 14.9645C10.7722 15.6 11.6419 15.9562 12.548 15.9562C13.4541 15.9562 14.3238 15.6 14.9696 14.9645C15.6154 14.329 15.9855 13.465 16 12.5591V3.44089C15.9976 2.52719 15.6329 1.65173 14.9858 1.00665C14.3387 0.361557 13.4622 -0.000472854 12.5484 1.04102e-06ZM3.45156 1.40978C3.99089 1.40954 4.50828 1.62326 4.89023 2.00404C5.27218 2.38482 5.48748 2.90156 5.48889 3.44089V7.48089C4.47892 7.62724 3.49264 7.90609 2.55556 8.31023C2.14954 8.48842 1.76733 8.71655 1.41778 8.98934V3.44089C1.41919 2.90218 1.634 2.38597 2.01518 2.00529C2.39636 1.62462 2.91284 1.41048 3.45156 1.40978ZM5.48889 12.5591C5.48889 13.0994 5.27424 13.6177 4.89217 13.9997C4.51009 14.3818 3.99189 14.5964 3.45156 14.5964C2.91122 14.5964 2.39302 14.3818 2.01094 13.9997C1.62887 13.6177 1.41422 13.0994 1.41422 12.5591V11.6444C1.41422 10.8364 2.05422 10.0711 3.12711 9.59467C3.88309 9.26852 4.6763 9.03656 5.48889 8.904V12.5591ZM12.5484 14.5902C12.0091 14.5905 11.4917 14.3767 11.1098 13.996C10.7278 13.6152 10.5125 13.0984 10.5111 12.5591V8.51911C11.5211 8.37276 12.5074 8.09392 13.4444 7.68978C13.8505 7.51159 14.2327 7.28345 14.5822 7.01067V12.5591C14.5808 13.0978 14.366 13.614 13.9848 13.9947C13.6036 14.3754 13.0872 14.5895 12.5484 14.5902ZM12.8729 6.4C12.1169 6.72615 11.3237 6.95811 10.5111 7.09067V3.44089C10.5111 2.90056 10.7258 2.38235 11.1078 2.00028C11.4899 1.6182 12.0081 1.40356 12.5484 1.40356C13.0888 1.40356 13.607 1.6182 13.9891 2.00028C14.3711 2.38235 14.5858 2.90056 14.5858 3.44089V4.35556C14.5858 5.16 13.9458 5.92534 12.8729 6.4Z" fill="url(#paint0_linear_10254_2422)"/>
    <defs>
      <linearGradient id="paint0_linear_10254_2422" x1="1.01333" y1="14.7674" x2="14.8954" y2="0.847434" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00AEE9"/>
        <stop offset="1" stop-color="#69FABD"/>
      </linearGradient>
    </defs>
  </svg>
`;

var arbitrumIcon = `
  <svg height="100%" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.7827 11.3172L15.5966 8.23933L20.4858 15.8545L20.4881 17.3159L20.4722 7.25942C20.4606 7.0136 20.3301 6.7887 20.1218 6.6561L11.3194 1.5928C11.1135 1.49162 10.8523 1.49269 10.6468 1.59594C10.6191 1.60989 10.593 1.62499 10.568 1.64147L10.5374 1.66079L1.99318 6.6121L1.95999 6.62712C1.91737 6.64674 1.8743 6.67165 1.83382 6.70063C1.67186 6.81683 1.56424 6.98861 1.52944 7.18131C1.52423 7.21052 1.52039 7.24026 1.51855 7.27023L1.53197 15.4653L6.08607 8.40666C6.65942 7.47067 7.90869 7.1692 9.06835 7.1856L10.4295 7.22155L2.40986 20.0827L3.3552 20.627L11.4709 7.23458L15.0581 7.22155L6.96327 20.9519L10.3366 22.8921L10.7396 23.1239C10.9101 23.1932 11.111 23.1967 11.283 23.1347L20.2091 17.9618L18.5026 18.9507L13.7827 11.3172ZM14.4747 21.2849L11.0677 15.9375L13.1474 12.4083L17.622 19.461L14.4747 21.2849Z" fill="#2D374B"/>
    <path d="M11.0684 15.9375L14.4754 21.2849L17.6228 19.4609L13.1482 12.4083L11.0684 15.9375Z" fill="#28A0F0"/>
    <path d="M20.4887 17.3159L20.4864 15.8545L15.5972 8.23932L13.7832 11.3172L18.5031 18.9507L20.2097 17.9618C20.3771 17.8259 20.4783 17.6264 20.489 17.4111L20.4887 17.3159Z" fill="#28A0F0"/>
    <path d="M7.71943e-05 18.694L2.41 20.0826L10.4296 7.22152L9.0685 7.18557C7.90883 7.16916 6.65964 7.47063 6.08621 8.40662L1.53211 15.4652L0 17.8193V18.694H7.71943e-05Z" fill="white"/>
    <path d="M15.0582 7.22156L11.4712 7.23459L3.35547 20.627L6.19211 22.2603L6.96354 20.9519L15.0582 7.22156Z" fill="white"/>
    <path d="M21.9999 7.20306C21.97 6.45287 21.5638 5.76608 20.9275 5.36626L12.0097 0.237888C11.3803 -0.079066 10.594 -0.0794494 9.96363 0.237658C9.88913 0.275218 1.2912 5.26171 1.2912 5.26171C1.17223 5.31874 1.05764 5.38673 0.949789 5.46384C0.381801 5.87094 0.0355663 6.50346 0 7.19846V17.8194L1.53211 15.4653L1.5187 7.27029C1.52054 7.24032 1.52429 7.21088 1.52958 7.18175C1.56415 6.9889 1.67185 6.81689 1.83397 6.70069C1.87444 6.67171 10.6192 1.60995 10.647 1.596C10.8526 1.49275 11.1137 1.49168 11.3195 1.59286L20.122 6.65616C20.3302 6.78876 20.4608 7.01366 20.4723 7.25948V17.4111C20.4617 17.6265 20.3766 17.8259 20.2092 17.9619L18.5026 18.9508L17.6221 19.461L14.4748 21.285L11.283 23.1347C11.1111 23.1968 10.9101 23.1933 10.7397 23.124L6.96334 20.952L6.19191 22.2603L9.58559 24.2142C9.6978 24.278 9.79784 24.3345 9.87985 24.3807C10.0069 24.452 10.0935 24.4996 10.1241 24.5144C10.3653 24.6315 10.7123 24.6997 11.025 24.6997C11.3118 24.6997 11.5913 24.647 11.8559 24.5434L21.1266 19.1745C21.6587 18.7623 21.9717 18.1406 21.9999 17.467V7.20306Z" fill="#96BEDC"/>
  </svg>
`;

var hourglass = `
<svg width="100%" height="100%" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0L0.0100002 6L4 10L0.0100002 14.01L0 20H12V14L8 10L12 6.01V0H0ZM10 14.5V18H2V14.5L6 10.5L10 14.5Z" fill="#929BED"/>
</svg>
`;

var checkmark = `
<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.48076 8.10881L1.33076 4.95881L0.280762 6.00881L4.48076 10.2088L13.4808 1.20881L12.4308 0.158813L4.48076 8.10881Z" fill="#A4F4C6"/>
</svg>
`;

var error = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.666992 13.0002H15.3337L8.00033 0.333496L0.666992 13.0002ZM8.66699 11.0002H7.33366V9.66683H8.66699V11.0002ZM8.66699 8.3335H7.33366V5.66683H8.66699V8.3335Z" fill="#FFB3B3"/>
</svg>
`;

var infoIcon = `
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
  </svg>
`;

function getDevice() {
	if (typeof window !== 'undefined') {
		const parsed = bowser.getParser(window.navigator.userAgent);
		const os = parsed.getOS();
		const browser = parsed.getBrowser();
		const { type } = parsed.getPlatform();
		return {
			type: type,
			os: os,
			browser: browser
		};
	} else {
		return {
			type: null,
			os: null,
			browser: null
		};
	}
}
const notNullish = (value) => value != null;
function validEnsChain(chainId) {
	switch (chainId) {
		case '0x1':
		case '0x3':
		case '0x4':
		case '0x5':
			return true;
		default:
			return false;
	}
}
function isSVG(str) {
	return str.includes('<svg');
}
function shortenAddress(add) {
	return `${add.slice(0, 6)}...${add.slice(-4)}`;
}
function shortenEns(ens) {
	return ens.length > 11 ? `${ens.slice(0, 4)}...${ens.slice(-6)}` : ens;
}
const chainIdToLabel = {
	'0x1': 'Ethereum',
	'0x3': 'Ropsten',
	'0x4': 'Rinkeby',
	'0x5': 'Goerli',
	'0x2a': 'Kovan',
	'0x38': 'Binance',
	'0x89': 'Polygon',
	'0xfa': 'Fantom',
	'0xa': 'Optimism',
	'0x45': 'Optimism Kovan',
	'0xa86a': 'Avalanche',
	'0xa4ec': 'Celo',
	'0x64': 'Gnosis',
	'0x63564C40': 'Harmony One',
	'0xa4b1': 'Arbitrum'
};
const networkToChainId = {
	main: '0x1',
	ropsten: '0x3',
	rinkeby: '0x4',
	goerli: '0x5',
	kovan: '0x2a',
	xdai: '0x64',
	'bsc-main': '0x38',
	'matic-main': '0x89',
	'fantom-main': '0xfa',
	'matic-mumbai': '0x80001'
};
const chainStyles = {
	'0x1': {
		icon: ethereumIcon,
		color: '#627EEA'
	},
	'0x3': {
		icon: ethereumIcon,
		color: '#627EEA'
	},
	'0x4': {
		icon: ethereumIcon,
		color: '#627EEA'
	},
	'0x5': {
		icon: ethereumIcon,
		color: '#627EEA'
	},
	'0x2a': {
		icon: ethereumIcon,
		color: '#627EEA'
	},
	'0x38': {
		icon: binanceIcon,
		color: '#F3BA2F'
	},
	'0x89': {
		icon: polygonIcon,
		color: '#8247E5'
	},
	'0xfa': {
		icon: fantomIcon,
		color: '#1969FF'
	},
	'0xa': {
		icon: optimismIcon,
		color: '#FF0420'
	},
	'0x45': {
		icon: optimismIcon,
		color: '#FF0420'
	},
	'0xa86a': {
		icon: avalancheIcon,
		color: '#E84142'
	},
	'0xa4ec': {
		icon: celoIcon,
		color: '#FBCC5C'
	},
	'0x64': {
		icon: gnosisIcon,
		color: '#04795B'
	},
	'0x63564C40': {
		icon: harmonyOneIcon,
		color: '#ffffff'
	},
	'0xa4b1': {
		icon: arbitrumIcon,
		color: '#33394B'
	}
};
const unrecognizedChainStyle = { icon: questionIcon, color: '#33394B' };
function getDefaultChainStyles(chainId) {
	return chainId ? chainStyles[chainId.toLowerCase()] : undefined;
}
function connectedToValidAppChain(walletConnectedChain, chains) {
	return !!chains.find(
		({ id, namespace }) =>
			id === walletConnectedChain.id && namespace === walletConnectedChain.namespace
	);
}
const defaultNotifyEventStyles = {
	pending: {
		backgroundColor: 'var(--onboard-primary-700, var(--primary-700))',
		borderColor: '#6370E5',
		eventIcon: hourglass
	},
	success: {
		backgroundColor: '#052E17',
		borderColor: 'var(--onboard-success-300, var(--success-300))',
		eventIcon: checkmark
	},
	error: {
		backgroundColor: '#FDB1B11A',
		borderColor: 'var(--onboard-danger-300, var(--danger-300))',
		eventIcon: error
	},
	hint: {
		backgroundColor: 'var(--onboard-gray-500, var(--gray-500))',
		borderColor: 'var(--onboard-gray-500, var(--gray-500))',
		iconColor: 'var(--onboard-gray-100, var(--gray-100))',
		eventIcon: infoIcon
	}
};

let configuration = {
	svelteInstance: null,
	appMetadata: null,
	apiKey: null,
	device: getDevice()
};
function updateConfiguration(update) {
	configuration = { ...configuration, ...update };
}

const APP_INITIAL_STATE = {
	wallets: [],
	walletModules: [],
	chains: [],
	accountCenter: {
		enabled: true,
		position: 'topRight',
		expanded: false,
		minimal: configuration.device.type === 'mobile'
	},
	notify: {
		enabled: true,
		transactionHandler: () => {},
		position: 'topRight'
	},
	notifications: [],
	locale: ''
};
const STORAGE_KEYS = {
	TERMS_AGREEMENT: 'onboard.js:agreement'
};

const ADD_CHAINS = 'add_chains';
const RESET_STORE = 'reset_store';
const ADD_WALLET = 'add_wallet';
const UPDATE_WALLET = 'update_wallet';
const REMOVE_WALLET = 'remove_wallet';
const UPDATE_ACCOUNT = 'update_account';
const UPDATE_ACCOUNT_CENTER = 'update_account_center';
const SET_WALLET_MODULES = 'set_wallet_modules';
const SET_LOCALE = 'set_locale';
const UPDATE_NOTIFY = 'update_notify';
const ADD_NOTIFICATION = 'add_notification';
const REMOVE_NOTIFICATION = 'remove_notification';
const UPDATE_ALL_WALLETS = 'update_balance';

function reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_CHAINS:
			return {
				...state,
				chains: [...state.chains, ...payload]
			};
		case ADD_WALLET: {
			const wallet = payload;
			const existingWallet = state.wallets.find(({ label }) => label === wallet.label);
			return {
				...state,
				wallets: [
					// add to front of wallets as it is now the primary wallet
					existingWallet || payload,
					// filter out wallet if it already existed
					...state.wallets.filter(({ label }) => label !== wallet.label)
				]
			};
		}
		case UPDATE_WALLET: {
			const update = payload;
			const { id, ...walletUpdate } = update;
			const updatedWallets = state.wallets.map((wallet) =>
				wallet.label === id ? { ...wallet, ...walletUpdate } : wallet
			);
			return {
				...state,
				wallets: updatedWallets
			};
		}
		case REMOVE_WALLET: {
			const update = payload;
			return {
				...state,
				wallets: state.wallets.filter(({ label }) => label !== update.id)
			};
		}
		case UPDATE_ACCOUNT: {
			const update = payload;
			const { id, address, ...accountUpdate } = update;
			const updatedWallets = state.wallets.map((wallet) => {
				if (wallet.label === id) {
					wallet.accounts = wallet.accounts.map((account) => {
						if (account.address === address) {
							return { ...account, ...accountUpdate };
						}
						return account;
					});
				}
				return wallet;
			});
			return {
				...state,
				wallets: updatedWallets
			};
		}
		case UPDATE_ALL_WALLETS: {
			const updatedWallets = payload;
			return {
				...state,
				wallets: updatedWallets
			};
		}
		case UPDATE_ACCOUNT_CENTER: {
			const update = payload;
			return {
				...state,
				accountCenter: {
					...state.accountCenter,
					...update
				}
			};
		}
		case UPDATE_NOTIFY: {
			const update = payload;
			return {
				...state,
				notify: {
					...state.notify,
					...update
				}
			};
		}
		case ADD_NOTIFICATION: {
			const update = payload;
			const notificationsUpdate = [...state.notifications];
			const notificationExistsIndex = notificationsUpdate.findIndex(({ id }) => id === update.id);
			if (notificationExistsIndex !== -1) {
				// if notification with same id, replace it with update
				notificationsUpdate[notificationExistsIndex] = update;
			} else {
				// otherwise add it to the beginning of array as new notification
				notificationsUpdate.unshift(update);
			}
			return {
				...state,
				notifications: notificationsUpdate
			};
		}
		case REMOVE_NOTIFICATION: {
			const id = payload;
			return {
				...state,
				notifications: state.notifications.filter((notification) => notification.id !== id)
			};
		}
		case SET_WALLET_MODULES: {
			return {
				...state,
				walletModules: payload
			};
		}
		case SET_LOCALE: {
			// Set the locale in the svelte-i18n internal state
			locale$1.set(payload);
			return {
				...state,
				locale: payload
			};
		}
		case RESET_STORE:
			return APP_INITIAL_STATE;
		default:
			throw new Error(`Unknown type: ${type} in appStore reducer`);
	}
}
const _store = new BehaviorSubject(APP_INITIAL_STATE);
const _stateUpdates = new Subject();
_stateUpdates.subscribe(_store);
function dispatch$1(action) {
	const state = _store.getValue();
	_stateUpdates.next(reducer(state, action));
}
function select(stateKey) {
	if (!stateKey) return _stateUpdates.asObservable();
	const validStateKeys = Object.keys(_store.getValue());
	if (!validStateKeys.includes(String(stateKey))) {
		throw new Error(`key: ${stateKey} does not exist on this store`);
	}
	return _stateUpdates
		.asObservable()
		.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey), filter(notNullish));
}
function get() {
	return _store.getValue();
}
const state = {
	select,
	get
};

function noop() {}
const identity = (x) => x;
function assign(tar, src) {
	// @ts-ignore
	for (const k in src) tar[k] = src[k];
	return tar;
}
function is_promise(value) {
	return value && typeof value === 'object' && typeof value.then === 'function';
}
function run(fn) {
	return fn();
}
function blank_object() {
	return Object.create(null);
}
function run_all(fns) {
	fns.forEach(run);
}
function is_function(thing) {
	return typeof thing === 'function';
}
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
	if (!src_url_equal_anchor) {
		src_url_equal_anchor = document.createElement('a');
	}
	src_url_equal_anchor.href = url;
	return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
	if (store == null) {
		return noop;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
	component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
	if (definition) {
		const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
		return definition[0](slot_ctx);
	}
}
function get_slot_context(definition, ctx, $$scope, fn) {
	return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
	if (definition[2] && fn) {
		const lets = definition[2](fn(dirty));
		if ($$scope.dirty === undefined) {
			return lets;
		}
		if (typeof lets === 'object') {
			const merged = [];
			const len = Math.max($$scope.dirty.length, lets.length);
			for (let i = 0; i < len; i += 1) {
				merged[i] = $$scope.dirty[i] | lets[i];
			}
			return merged;
		}
		return $$scope.dirty | lets;
	}
	return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
	if (slot_changes) {
		const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
		slot.p(slot_context, slot_changes);
	}
}
function get_all_dirty_from_scope($$scope) {
	if ($$scope.ctx.length > 32) {
		const dirty = [];
		const length = $$scope.ctx.length / 32;
		for (let i = 0; i < length; i++) {
			dirty[i] = -1;
		}
		return dirty;
	}
	return -1;
}
function null_to_empty(value) {
	return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
	tasks.forEach((task) => {
		if (!task.c(now)) {
			tasks.delete(task);
			task.f();
		}
	});
	if (tasks.size !== 0) raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
	let task;
	if (tasks.size === 0) raf(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			tasks.add((task = { c: callback, f: fulfill }));
		}),
		abort() {
			tasks.delete(task);
		}
	};
}
function append(target, node) {
	target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
	const append_styles_to = get_root_for_style(target);
	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && root.host) {
		return root;
	}
	return node.ownerDocument;
}
function append_empty_stylesheet(node) {
	const style_element = element('style');
	append_stylesheet(get_root_for_style(node), style_element);
	return style_element.sheet;
}
function append_stylesheet(node, style) {
	append(node.head || node, style);
}
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}
function detach(node) {
	node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}
function element(name) {
	return document.createElement(name);
}
function svg_element(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
	return document.createTextNode(data);
}
function space() {
	return text(' ');
}
function empty() {
	return text('');
}
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
	return function (event) {
		event.stopPropagation();
		// @ts-ignore
		return fn.call(this, event);
	};
}
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function children(element) {
	return Array.from(element.childNodes);
}
function set_data(text, data) {
	data = '' + data;
	if (text.wholeText !== data) text.data = data;
}
function set_style(node, key, value, important) {
	if (value === null) {
		node.style.removeProperty(key);
	} else {
		node.style.setProperty(key, value, important ? 'important' : '');
	}
}
function select_option(select, value) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];
		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
	select.selectedIndex = -1; // no option should be selected
}
function toggle_class(element, name, toggle) {
	element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	const e = document.createEvent('CustomEvent');
	e.initCustomEvent(type, bubbles, cancelable, detail);
	return e;
}
class HtmlTag {
	constructor(is_svg = false) {
		this.is_svg = false;
		this.is_svg = is_svg;
		this.e = this.n = null;
	}
	c(html) {
		this.h(html);
	}
	m(html, target, anchor = null) {
		if (!this.e) {
			if (this.is_svg) this.e = svg_element(target.nodeName);
			else this.e = element(target.nodeName);
			this.t = target;
			this.c(html);
		}
		this.i(anchor);
	}
	h(html) {
		this.e.innerHTML = html;
		this.n = Array.from(this.e.childNodes);
	}
	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert(this.t, this.n[i], anchor);
		}
	}
	p(html) {
		this.d();
		this.h(html);
		this.i(this.a);
	}
	d() {
		this.n.forEach(detach);
	}
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
	let hash = 5381;
	let i = str.length;
	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return hash >>> 0;
}
function create_style_information(doc, node) {
	const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
	managed_styles.set(doc, info);
	return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
	const step = 16.666 / duration;
	let keyframes = '{\n';
	for (let p = 0; p <= 1; p += step) {
		const t = a + (b - a) * ease(p);
		keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
	}
	const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
	const name = `__svelte_${hash(rule)}_${uid}`;
	const doc = get_root_for_style(node);
	const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
	if (!rules[name]) {
		rules[name] = true;
		stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
	}
	const animation = node.style.animation || '';
	node.style.animation = `${
		animation ? `${animation}, ` : ''
	}${name} ${duration}ms linear ${delay}ms 1 both`;
	active += 1;
	return name;
}
function delete_rule(node, name) {
	const previous = (node.style.animation || '').split(', ');
	const next = previous.filter(
		name
			? (anim) => anim.indexOf(name) < 0 // remove specific animation
			: (anim) => anim.indexOf('__svelte') === -1 // remove all Svelte animations
	);
	const deleted = previous.length - next.length;
	if (deleted) {
		node.style.animation = next.join(', ');
		active -= deleted;
		if (!active) clear_rules();
	}
}
function clear_rules() {
	raf(() => {
		if (active) return;
		managed_styles.forEach((info) => {
			const { stylesheet } = info;
			let i = stylesheet.cssRules.length;
			while (i--) stylesheet.deleteRule(i);
			info.rules = {};
		});
		managed_styles.clear();
	});
}

function create_animation(node, from, fn, params) {
	if (!from) return noop;
	const to = node.getBoundingClientRect();
	if (
		from.left === to.left &&
		from.right === to.right &&
		from.top === to.top &&
		from.bottom === to.bottom
	)
		return noop;
	const {
		delay = 0,
		duration = 300,
		easing = identity,
		// @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
		start: start_time = now() + delay,
		// @ts-ignore todo:
		end = start_time + duration,
		tick = noop,
		css
	} = fn(node, { from, to }, params);
	let running = true;
	let started = false;
	let name;
	function start() {
		if (css) {
			name = create_rule(node, 0, 1, duration, delay, easing, css);
		}
		if (!delay) {
			started = true;
		}
	}
	function stop() {
		if (css) delete_rule(node, name);
		running = false;
	}
	loop((now) => {
		if (!started && now >= start_time) {
			started = true;
		}
		if (started && now >= end) {
			tick(1, 0);
			stop();
		}
		if (!running) {
			return false;
		}
		if (started) {
			const p = now - start_time;
			const t = 0 + 1 * easing(p / duration);
			tick(t, 1 - t);
		}
		return true;
	});
	start();
	tick(0, 1);
	return stop;
}
function fix_position(node) {
	const style = getComputedStyle(node);
	if (style.position !== 'absolute' && style.position !== 'fixed') {
		const { width, height } = style;
		const a = node.getBoundingClientRect();
		node.style.position = 'absolute';
		node.style.width = width;
		node.style.height = height;
		add_transform(node, a);
	}
}
function add_transform(node, a) {
	const b = node.getBoundingClientRect();
	if (a.left !== b.left || a.top !== b.top) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;
		node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
	}
}

let current_component;
function set_current_component(component) {
	current_component = component;
}
function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}
function beforeUpdate(fn) {
	get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
	get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
	get_current_component().$$.on_destroy.push(fn);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
	const callbacks = component.$$.callbacks[event.type];
	if (callbacks) {
		// @ts-ignore
		callbacks.slice().forEach((fn) => fn.call(this, event));
	}
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}
function add_render_callback(fn) {
	render_callbacks.push(fn);
}
function add_flush_callback(fn) {
	flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		while (flushidx < dirty_components.length) {
			const component = dirty_components[flushidx];
			flushidx++;
			set_current_component(component);
			update(component.$$);
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

let promise;
function wait() {
	if (!promise) {
		promise = Promise.resolve();
		promise.then(() => {
			promise = null;
		});
	}
	return promise;
}
function dispatch(node, direction, kind) {
	node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
	outros = {
		r: 0,
		c: [],
		p: outros // parent group
	};
}
function check_outros() {
	if (!outros.r) {
		run_all(outros.c);
	}
	outros = outros.p;
}
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}
function transition_out(block, local, detach, callback) {
	if (block && block.o) {
		if (outroing.has(block)) return;
		outroing.add(block);
		outros.c.push(() => {
			outroing.delete(block);
			if (callback) {
				if (detach) block.d(1);
				callback();
			}
		});
		block.o(local);
	}
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
	let config = fn(node, params);
	let running = false;
	let animation_name;
	let task;
	let uid = 0;
	function cleanup() {
		if (animation_name) delete_rule(node, animation_name);
	}
	function go() {
		const {
			delay = 0,
			duration = 300,
			easing = identity,
			tick = noop,
			css
		} = config || null_transition;
		if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
		tick(0, 1);
		const start_time = now() + delay;
		const end_time = start_time + duration;
		if (task) task.abort();
		running = true;
		add_render_callback(() => dispatch(node, true, 'start'));
		task = loop((now) => {
			if (running) {
				if (now >= end_time) {
					tick(1, 0);
					dispatch(node, true, 'end');
					cleanup();
					return (running = false);
				}
				if (now >= start_time) {
					const t = easing((now - start_time) / duration);
					tick(t, 1 - t);
				}
			}
			return running;
		});
	}
	let started = false;
	return {
		start() {
			if (started) return;
			started = true;
			delete_rule(node);
			if (is_function(config)) {
				config = config();
				wait().then(go);
			} else {
				go();
			}
		},
		invalidate() {
			started = false;
		},
		end() {
			if (running) {
				cleanup();
				running = false;
			}
		}
	};
}
function create_out_transition(node, fn, params) {
	let config = fn(node, params);
	let running = true;
	let animation_name;
	const group = outros;
	group.r += 1;
	function go() {
		const {
			delay = 0,
			duration = 300,
			easing = identity,
			tick = noop,
			css
		} = config || null_transition;
		if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
		const start_time = now() + delay;
		const end_time = start_time + duration;
		add_render_callback(() => dispatch(node, false, 'start'));
		loop((now) => {
			if (running) {
				if (now >= end_time) {
					tick(0, 1);
					dispatch(node, false, 'end');
					if (!--group.r) {
						// this will result in `end()` being called,
						// so we don't need to clean up here
						run_all(group.c);
					}
					return false;
				}
				if (now >= start_time) {
					const t = easing((now - start_time) / duration);
					tick(1 - t, t);
				}
			}
			return running;
		});
	}
	if (is_function(config)) {
		wait().then(() => {
			// @ts-ignore
			config = config();
			go();
		});
	} else {
		go();
	}
	return {
		end(reset) {
			if (reset && config.tick) {
				config.tick(1, 0);
			}
			if (running) {
				if (animation_name) delete_rule(node, animation_name);
				running = false;
			}
		}
	};
}
function create_bidirectional_transition(node, fn, params, intro) {
	let config = fn(node, params);
	let t = intro ? 0 : 1;
	let running_program = null;
	let pending_program = null;
	let animation_name = null;
	function clear_animation() {
		if (animation_name) delete_rule(node, animation_name);
	}
	function init(program, duration) {
		const d = program.b - t;
		duration *= Math.abs(d);
		return {
			a: t,
			b: program.b,
			d,
			duration,
			start: program.start,
			end: program.start + duration,
			group: program.group
		};
	}
	function go(b) {
		const {
			delay = 0,
			duration = 300,
			easing = identity,
			tick = noop,
			css
		} = config || null_transition;
		const program = {
			start: now() + delay,
			b
		};
		if (!b) {
			// @ts-ignore todo: improve typings
			program.group = outros;
			outros.r += 1;
		}
		if (running_program || pending_program) {
			pending_program = program;
		} else {
			// if this is an intro, and there's a delay, we need to do
			// an initial tick and/or apply CSS animation immediately
			if (css) {
				clear_animation();
				animation_name = create_rule(node, t, b, duration, delay, easing, css);
			}
			if (b) tick(0, 1);
			running_program = init(program, duration);
			add_render_callback(() => dispatch(node, b, 'start'));
			loop((now) => {
				if (pending_program && now > pending_program.start) {
					running_program = init(pending_program, duration);
					pending_program = null;
					dispatch(node, running_program.b, 'start');
					if (css) {
						clear_animation();
						animation_name = create_rule(
							node,
							t,
							running_program.b,
							running_program.duration,
							0,
							easing,
							config.css
						);
					}
				}
				if (running_program) {
					if (now >= running_program.end) {
						tick((t = running_program.b), 1 - t);
						dispatch(node, running_program.b, 'end');
						if (!pending_program) {
							// we're done
							if (running_program.b) {
								// intro — we can tidy up immediately
								clear_animation();
							} else {
								// outro — needs to be coordinated
								if (!--running_program.group.r) run_all(running_program.group.c);
							}
						}
						running_program = null;
					} else if (now >= running_program.start) {
						const p = now - running_program.start;
						t = running_program.a + running_program.d * easing(p / running_program.duration);
						tick(t, 1 - t);
					}
				}
				return !!(running_program || pending_program);
			});
		}
	}
	return {
		run(b) {
			if (is_function(config)) {
				wait().then(() => {
					// @ts-ignore
					config = config();
					go(b);
				});
			} else {
				go(b);
			}
		},
		end() {
			clear_animation();
			running_program = pending_program = null;
		}
	};
}

function handle_promise(promise, info) {
	const token = (info.token = {});
	function update(type, index, key, value) {
		if (info.token !== token) return;
		info.resolved = value;
		let child_ctx = info.ctx;
		if (key !== undefined) {
			child_ctx = child_ctx.slice();
			child_ctx[key] = value;
		}
		const block = type && (info.current = type)(child_ctx);
		let needs_flush = false;
		if (info.block) {
			if (info.blocks) {
				info.blocks.forEach((block, i) => {
					if (i !== index && block) {
						group_outros();
						transition_out(block, 1, 1, () => {
							if (info.blocks[i] === block) {
								info.blocks[i] = null;
							}
						});
						check_outros();
					}
				});
			} else {
				info.block.d(1);
			}
			block.c();
			transition_in(block, 1);
			block.m(info.mount(), info.anchor);
			needs_flush = true;
		}
		info.block = block;
		if (info.blocks) info.blocks[index] = block;
		if (needs_flush) {
			flush();
		}
	}
	if (is_promise(promise)) {
		const current_component = get_current_component();
		promise.then(
			(value) => {
				set_current_component(current_component);
				update(info.then, 1, info.value, value);
				set_current_component(null);
			},
			(error) => {
				set_current_component(current_component);
				update(info.catch, 2, info.error, error);
				set_current_component(null);
				if (!info.hasCatch) {
					throw error;
				}
			}
		);
		// if we previously had a then/catch block, destroy it
		if (info.current !== info.pending) {
			update(info.pending, 0);
			return true;
		}
	} else {
		if (info.current !== info.then) {
			update(info.then, 1, info.value, promise);
			return true;
		}
		info.resolved = promise;
	}
}
function update_await_block_branch(info, ctx, dirty) {
	const child_ctx = ctx.slice();
	const { resolved } = info;
	if (info.current === info.then) {
		child_ctx[info.value] = resolved;
	}
	if (info.current === info.catch) {
		child_ctx[info.error] = resolved;
	}
	info.block.p(child_ctx, dirty);
}

function destroy_block(block, lookup) {
	block.d(1);
	lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
	transition_out(block, 1, 1, () => {
		lookup.delete(block.key);
	});
}
function fix_and_outro_and_destroy_block(block, lookup) {
	block.f();
	outro_and_destroy_block(block, lookup);
}
function update_keyed_each(
	old_blocks,
	dirty,
	get_key,
	dynamic,
	ctx,
	list,
	lookup,
	node,
	destroy,
	create_each_block,
	next,
	get_context
) {
	let o = old_blocks.length;
	let n = list.length;
	let i = o;
	const old_indexes = {};
	while (i--) old_indexes[old_blocks[i].key] = i;
	const new_blocks = [];
	const new_lookup = new Map();
	const deltas = new Map();
	i = n;
	while (i--) {
		const child_ctx = get_context(ctx, list, i);
		const key = get_key(child_ctx);
		let block = lookup.get(key);
		if (!block) {
			block = create_each_block(key, child_ctx);
			block.c();
		} else if (dynamic) {
			block.p(child_ctx, dirty);
		}
		new_lookup.set(key, (new_blocks[i] = block));
		if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
	}
	const will_move = new Set();
	const did_move = new Set();
	function insert(block) {
		transition_in(block, 1);
		block.m(node, next);
		lookup.set(block.key, block);
		next = block.first;
		n--;
	}
	while (o && n) {
		const new_block = new_blocks[n - 1];
		const old_block = old_blocks[o - 1];
		const new_key = new_block.key;
		const old_key = old_block.key;
		if (new_block === old_block) {
			// do nothing
			next = new_block.first;
			o--;
			n--;
		} else if (!new_lookup.has(old_key)) {
			// remove old block
			destroy(old_block, lookup);
			o--;
		} else if (!lookup.has(new_key) || will_move.has(new_key)) {
			insert(new_block);
		} else if (did_move.has(old_key)) {
			o--;
		} else if (deltas.get(new_key) > deltas.get(old_key)) {
			did_move.add(new_key);
			insert(new_block);
		} else {
			will_move.add(old_key);
			o--;
		}
	}
	while (o--) {
		const old_block = old_blocks[o];
		if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
	}
	while (n) insert(new_blocks[n - 1]);
	return new_blocks;
}

function bind(component, name, callback) {
	const index = component.$$.props[name];
	if (index !== undefined) {
		component.$$.bound[index] = callback;
		callback(component.$$.ctx[index]);
	}
}
function create_component(block) {
	block && block.c();
}
function mount_component(component, target, anchor, customElement) {
	const { fragment, on_mount, on_destroy, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	if (!customElement) {
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {
			const new_on_destroy = on_mount.map(run).filter(is_function);
			if (on_destroy) {
				on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
	}
	after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}
function init$1(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	const $$ = (component.$$ = {
		fragment: null,
		ctx: null,
		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			const nodes = children(options.target);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor, options.customElement);
		flush();
	}
	set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}
	$on(type, callback) {
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}
	$set($$props) {
		if (this.$$set && !is_empty($$props)) {
			this.$$.skip_bound = true;
			this.$$set($$props);
			this.$$.skip_bound = false;
		}
	}
}

const chainId = Joi.string().pattern(/^0x[0-9a-fA-F]+$/);
const chainNamespace = Joi.string().valid('evm');
const unknownObject = Joi.object().unknown();
/** Related to ConnectionInfo from 'ethers/lib/utils' */
const providerConnectionInfo = Joi.object({
	url: Joi.string().required(),
	headers: Joi.object(),
	user: Joi.string(),
	password: Joi.string(),
	allowInsecureAuthentication: Joi.boolean(),
	allowGzip: Joi.boolean(),
	throttleLimit: Joi.number(),
	throttleSlotInterval: Joi.number(),
	throttleCallback: Joi.function(),
	timeout: Joi.number()
});
const chainValidationParams = {
	namespace: chainNamespace,
	id: chainId.required(),
	rpcUrl: Joi.string().required(),
	label: Joi.string().required(),
	token: Joi.string().required(),
	icon: Joi.string(),
	color: Joi.string(),
	publicRpcUrl: Joi.string(),
	blockExplorerUrl: Joi.string(),
	providerConnectionInfo
};
const chain = Joi.object(chainValidationParams);
const connectedChain = Joi.object({
	namespace: chainNamespace.required(),
	id: chainId.required()
});
const ens = Joi.any().allow(
	Joi.object({
		name: Joi.string().required(),
		avatar: Joi.string(),
		contentHash: Joi.any().allow(Joi.string(), null),
		getText: Joi.function().arity(1).required()
	}),
	null
);
const balance = Joi.any().allow(
	Joi.object({
		eth: Joi.number()
	}).unknown(),
	null
);
const account = Joi.object({
	address: Joi.string().required(),
	ens,
	balance
});
const chains = Joi.array().items(chain);
const accounts = Joi.array().items(account);
const wallet = Joi.object({
	label: Joi.string(),
	icon: Joi.string(),
	provider: unknownObject,
	instance: unknownObject,
	accounts,
	chains: Joi.array().items(connectedChain)
});
const wallets = Joi.array().items(wallet);
const recommendedWallet = Joi.object({
	name: Joi.string().required(),
	url: Joi.string().uri().required()
});
const agreement = Joi.object({
	version: Joi.string().required(),
	termsUrl: Joi.string().uri(),
	privacyUrl: Joi.string().uri()
});
const appMetadata = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	icon: Joi.string().required(),
	logo: Joi.string(),
	gettingStartedGuide: Joi.string(),
	email: Joi.string(),
	appUrl: Joi.string(),
	explore: Joi.string(),
	recommendedInjectedWallets: Joi.array().items(recommendedWallet),
	agreement
});
Joi.object({
	label: Joi.string().required(),
	getInfo: Joi.function().arity(1).required(),
	getInterface: Joi.function().arity(1).required()
});
const walletInit = Joi.array().items(Joi.function()).required();
const locale = Joi.string();
const commonPositions = Joi.string().valid('topRight', 'bottomRight', 'bottomLeft', 'topLeft');
const notify$1 = Joi.object({
	transactionHandler: Joi.function(),
	enabled: Joi.boolean(),
	position: commonPositions
});
const notifyOptions = Joi.object({
	desktop: notify$1,
	mobile: notify$1
});
const initOptions = Joi.object({
	wallets: walletInit,
	chains: chains.required(),
	appMetadata: appMetadata,
	i18n: Joi.object().unknown(),
	apiKey: Joi.string(),
	accountCenter: Joi.object({
		desktop: Joi.object({
			enabled: Joi.boolean(),
			minimal: Joi.boolean(),
			position: commonPositions
		}),
		mobile: Joi.object({
			enabled: Joi.boolean(),
			minimal: Joi.boolean(),
			position: commonPositions
		})
	}),
	notify: [notifyOptions, notify$1]
});
const connectOptions = Joi.object({
	autoSelect: [
		Joi.object({
			label: Joi.string().required(),
			disableModals: Joi.boolean()
		}),
		Joi.string()
	]
});
const disconnectOptions = Joi.object({
	label: Joi.string().required()
}).required();
const setChainOptions = Joi.object({
	chainId: chainId.required(),
	chainNamespace: chainNamespace,
	wallet: Joi.string()
});
const accountCenter$1 = Joi.object({
	enabled: Joi.boolean(),
	position: commonPositions,
	expanded: Joi.boolean(),
	minimal: Joi.boolean()
});
const customNotificationUpdate = Joi.object({
	key: Joi.string().required(),
	type: Joi.string().allow('pending', 'error', 'success', 'hint'),
	eventCode: Joi.string(),
	message: Joi.string().required(),
	id: Joi.string().required(),
	autoDismiss: Joi.number(),
	onClick: Joi.function(),
	link: Joi.string()
});
const customNotification$1 = Joi.object({
	key: Joi.string(),
	type: Joi.string().allow('pending', 'error', 'success', 'hint'),
	eventCode: Joi.string(),
	message: Joi.string(),
	id: Joi.string(),
	autoDismiss: Joi.number(),
	onClick: Joi.function(),
	link: Joi.string()
});
const notification = Joi.object({
	id: Joi.string().required(),
	key: Joi.string().required(),
	type: Joi.string().allow('pending', 'error', 'success', 'hint').required(),
	eventCode: Joi.string().required(),
	message: Joi.string().required(),
	autoDismiss: Joi.number().required(),
	network: Joi.string().required(),
	startTime: Joi.number(),
	onClick: Joi.function(),
	link: Joi.string()
});
const transactionHandlerReturn = Joi.any().allow(
	customNotificationUpdate,
	Joi.boolean().allow(false)
);
function validate(validator, data) {
	const result = validator.validate(data);
	return result.error ? result : null;
}
function validateWallet(data) {
	return validate(wallet, data);
}
function validateInitOptions(data) {
	return validate(initOptions, data);
}
function validateConnectOptions(data) {
	return validate(connectOptions, data);
}
function validateDisconnectOptions(data) {
	return validate(disconnectOptions, data);
}
function validateString(str) {
	return validate(Joi.string().required(), str);
}
function validateSetChainOptions(data) {
	return validate(setChainOptions, data);
}
function validateAccountCenterUpdate(data) {
	return validate(accountCenter$1, data);
}
function validateWalletInit(data) {
	return validate(walletInit, data);
}
function validateLocale(data) {
	return validate(locale, data);
}
function validateNotify(data) {
	return validate(notify$1, data);
}
function validateNotifyOptions(data) {
	return validate(notifyOptions, data);
}
function validateTransactionHandlerReturn(data) {
	return validate(transactionHandlerReturn, data);
}
function validateNotification(data) {
	return validate(notification, data);
}
function validateCustomNotificationUpdate(data) {
	return validate(customNotificationUpdate, data);
}
function validateCustomNotification(data) {
	return validate(customNotification$1, data);
}
function validateUpdateBalances(data) {
	return validate(wallets, data);
}

function addChains(chains) {
	// chains are validated on init
	const action = {
		type: ADD_CHAINS,
		payload: chains.map(({ namespace = 'evm', id, ...rest }) => ({
			...rest,
			namespace,
			id: id.toLowerCase()
		}))
	};
	dispatch$1(action);
}
function addWallet(wallet) {
	const error = validateWallet(wallet);
	if (error) {
		console.error(error);
		throw error;
	}
	const action = {
		type: ADD_WALLET,
		payload: wallet
	};
	dispatch$1(action);
}
function updateWallet(id, update) {
	const error = validateWallet(update);
	if (error) {
		console.error(error);
		throw error;
	}
	const action = {
		type: UPDATE_WALLET,
		payload: {
			id,
			...update
		}
	};
	dispatch$1(action);
}
function removeWallet(id) {
	const error = validateString(id);
	if (error) {
		throw error;
	}
	const action = {
		type: REMOVE_WALLET,
		payload: {
			id
		}
	};
	dispatch$1(action);
}
function updateAccount(id, address, update) {
	const action = {
		type: UPDATE_ACCOUNT,
		payload: {
			id,
			address,
			...update
		}
	};
	dispatch$1(action);
}
function updateAccountCenter(update) {
	const error = validateAccountCenterUpdate(update);
	if (error) {
		throw error;
	}
	const action = {
		type: UPDATE_ACCOUNT_CENTER,
		payload: update
	};
	dispatch$1(action);
}
function updateNotify(update) {
	const error = validateNotify(update);
	if (error) {
		throw error;
	}
	const action = {
		type: UPDATE_NOTIFY,
		payload: update
	};
	dispatch$1(action);
}
function addNotification(notification) {
	const error = validateNotification(notification);
	if (error) {
		throw error;
	}
	const action = {
		type: ADD_NOTIFICATION,
		payload: notification
	};
	dispatch$1(action);
}
function addCustomNotification(notification) {
	const customNotificationError = validateCustomNotificationUpdate(notification);
	if (customNotificationError) {
		throw customNotificationError;
	}
	const action = {
		type: ADD_NOTIFICATION,
		payload: notification
	};
	dispatch$1(action);
}
function customNotification(updatedNotification) {
	const customNotificationError = validateCustomNotification(updatedNotification);
	if (customNotificationError) {
		throw customNotificationError;
	}
	const customIdKey = `customNotification-${nanoid()}`;
	const notification = {
		...updatedNotification,
		id: customIdKey,
		key: customIdKey
	};
	addCustomNotification(notification);
	const dismiss = () => removeNotification(notification.id);
	const update = (notificationUpdate) => {
		const customNotificationError = validateCustomNotification(updatedNotification);
		if (customNotificationError) {
			throw customNotificationError;
		}
		const notificationAfterUpdate = {
			...notificationUpdate,
			id: notification.id,
			key: notification.key
		};
		addCustomNotification(notificationAfterUpdate);
		return {
			dismiss,
			update
		};
	};
	addCustomNotification(notification);
	return {
		dismiss,
		update
	};
}
function removeNotification(id) {
	if (typeof id !== 'string') {
		throw new Error('Notification id must be of type string');
	}
	const action = {
		type: REMOVE_NOTIFICATION,
		payload: id
	};
	dispatch$1(action);
}
function resetStore() {
	const action = {
		type: RESET_STORE
	};
	dispatch$1(action);
}
function setWalletModules(wallets) {
	const error = validateWalletInit(wallets);
	if (error) {
		throw error;
	}
	const modules = initializeWalletModules(wallets);
	const dedupedWallets = uniqueWalletsByLabel(modules);
	const action = {
		type: SET_WALLET_MODULES,
		payload: dedupedWallets
	};
	dispatch$1(action);
}
function setLocale(locale) {
	const error = validateLocale(locale);
	if (error) {
		throw error;
	}
	const action = {
		type: SET_LOCALE,
		payload: locale
	};
	dispatch$1(action);
}
function updateAllWallets(wallets) {
	const error = validateUpdateBalances(wallets);
	if (error) {
		throw error;
	}
	const action = {
		type: UPDATE_ALL_WALLETS,
		payload: wallets
	};
	dispatch$1(action);
}
// ==== HELPERS ==== //
function initializeWalletModules(modules) {
	const { device } = configuration;
	return modules.reduce((acc, walletInit) => {
		const initialized = walletInit({ device });
		if (initialized) {
			// injected wallets is an array of wallets
			acc.push(...(Array.isArray(initialized) ? initialized : [initialized]));
		}
		return acc;
	}, []);
}
function uniqueWalletsByLabel(walletModuleList) {
	return walletModuleList.filter(
		(wallet, i) =>
			walletModuleList.findIndex((innerWallet) => innerWallet.label === wallet.label) === i
	);
}

const reset$ = new Subject();
const disconnectWallet$ = new Subject();
const connectWallet$ = new BehaviorSubject({ inProgress: false, actionRequired: '' });
const switchChainModal$ = new BehaviorSubject(null);
const wallets$ = state.select('wallets').pipe(shareReplay(1));
// reset logic
reset$.pipe(withLatestFrom(wallets$), pluck('1')).subscribe((wallets) => {
	// disconnect all wallets
	wallets.forEach(({ label }) => {
		disconnectWallet$.next(label);
	});
	resetStore();
});
defer(() => {
	const subject = new Subject();
	onMount(() => {
		subject.next();
	});
	return subject.asObservable().pipe(take(1));
});
const onDestroy$ = defer(() => {
	const subject = new Subject();
	onDestroy(() => {
		subject.next();
	});
	return subject.asObservable().pipe(take(1));
});
defer(() => {
	const subject = new Subject();
	afterUpdate(() => {
		subject.next();
	});
	return subject.asObservable().pipe(takeUntil(onDestroy$));
});
defer(() => {
	const subject = new Subject();
	beforeUpdate(() => {
		subject.next();
	});
	return subject.asObservable().pipe(takeUntil(onDestroy$));
});

async function connect$1(options) {
	if (options) {
		const error = validateConnectOptions(options);
		if (error) {
			throw error;
		}
	}
	const { chains } = state.get();
	// Wallets require the chains for initializing providers,
	// so we must ensure at least one is set
	if (!chains.length)
		throw new Error('At least one chain must be set before attempting to connect a wallet');
	const { autoSelect } = options || {
		autoSelect: { label: '', disableModals: false }
	};
	connectWallet$.next({
		autoSelect:
			typeof autoSelect === 'string' ? { label: autoSelect, disableModals: false } : autoSelect,
		inProgress: true
	});
	const result$ = connectWallet$.pipe(
		filter(({ inProgress, actionRequired }) => inProgress === false && !actionRequired),
		withLatestFrom(wallets$),
		pluck(1)
	);
	return firstValueFrom(result$);
}

var connect = {
	selectingWallet: {
		header: 'Available Wallets',
		sidebar: {
			heading: 'Get Started',
			subheading: 'Connect your wallet',
			paragraph:
				'Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started.'
		},
		recommendedWalletsPart1: '{app} only supports',
		recommendedWalletsPart2:
			'on this platform. Please use or install one of the supported wallets to continue',
		installWallet:
			'You do not have any wallets installed that {app} supports, please use a supported wallet',
		agreement: {
			agree: 'I agree to the',
			terms: 'Terms & Conditions',
			and: 'and',
			privacy: 'Privacy Policy'
		}
	},
	connectingWallet: {
		header:
			'{connectionRejected, select, false {Connecting to {wallet}...} other {Connection Rejected}}',
		sidebar: {
			subheading: 'Approve Connection',
			paragraph: 'Please approve the connection in your wallet and authorize access to continue.'
		},
		mainText: 'Connecting...',
		paragraph: 'Make sure to select all accounts that you want to grant access to.',
		rejectedText: 'Connection Rejected!',
		rejectedCTA: 'Click here to try again',
		primaryButton: 'Back to wallets'
	},
	connectedWallet: {
		header: 'Connection Successful',
		sidebar: {
			subheading: 'Connection Successful!',
			paragraph: 'Your wallet is now connected to {app}'
		},
		mainText: 'Connected'
	}
};
var modals = {
	actionRequired: {
		heading: 'Action required in {wallet}',
		paragraph: 'Please switch the active account in your wallet.',
		linkText: 'Learn more.',
		buttonText: 'Okay'
	},
	switchChain: {
		heading: 'Switch Chain',
		paragraph1:
			'{app} requires that you switch your wallet to the {nextNetworkName} network to continue.',
		paragraph2:
			'*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.'
	},
	confirmDisconnectAll: {
		heading: 'Disconnect all Wallets',
		description: 'Are you sure that you would like to disconnect all your wallets?',
		confirm: 'Confirm',
		cancel: 'Cancel'
	}
};
var accountCenter = {
	connectAnotherWallet: 'Connect another Wallet',
	disconnectAllWallets: 'Disconnect all Wallets',
	currentNetwork: 'Current Network',
	appInfo: 'App Info',
	learnMore: 'Learn More',
	gettingStartedGuide: 'Getting Started Guide',
	smartContracts: 'Smart Contract(s)',
	explore: 'Explore',
	backToApp: 'Back to dapp',
	poweredBy: 'powered by',
	addAccount: 'Add Account',
	setPrimaryAccount: 'Set Primary Account',
	disconnectWallet: 'Disconnect Wallet'
};
var notify = {
	transaction: {
		txRequest: 'Your transaction is waiting for you to confirm',
		nsfFail: 'You have insufficient funds to complete this transaction',
		txUnderpriced:
			'The gas price for your transaction is too low, try again with a higher gas price',
		txRepeat: 'This could be a repeat transaction',
		txAwaitingApproval: 'You have a previous transaction waiting for you to confirm',
		txConfirmReminder:
			'Please confirm your transaction to continue, the transaction window may be behind your browser',
		txSendFail: 'You rejected the transaction',
		txSent: 'Your transaction has been sent to the network',
		txStallPending: 'Your transaction has stalled and has not entered the transaction pool',
		txStuck: 'Your transaction is stuck due to a nonce gap',
		txPool: 'Your transaction has started',
		txStallConfirmed: "Your transaction has stalled and hasn't been confirmed",
		txSpeedUp: 'Your transaction has been sped up',
		txCancel: 'Your transaction is being canceled',
		txFailed: 'Your transaction has failed',
		txConfirmed: 'Your transaction has succeeded',
		txError: 'Oops something went wrong, please try again'
	},
	watched: {
		txPool: 'Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
		txSpeedUp:
			'Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up',
		txCancel:
			'Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled',
		txConfirmed:
			'Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
		txFailed:
			'Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}'
	},
	time: {
		minutes: 'min',
		seconds: 'sec'
	}
};
var en = {
	connect: connect,
	modals: modals,
	accountCenter: accountCenter,
	notify: notify
};

function handleTransactionUpdates(transaction) {
	const customized = state.get().notify.transactionHandler(transaction);
	const invalid = validateTransactionHandlerReturn(customized);
	if (invalid) {
		throw invalid;
	}
	const notification = transactionEventToNotification(transaction, customized);
	addNotification(notification);
}
function transactionEventToNotification(transaction, customization) {
	const { id, hash, startTime, eventCode, direction, counterparty, value, asset, network } =
		transaction;
	const type = eventToType(eventCode);
	const key = `${id || hash}-${
		(typeof customization === 'object' && customization.eventCode) || eventCode
	}`;
	const counterpartyShortened =
		counterparty &&
		counterparty.substring(0, 4) + '...' + counterparty.substring(counterparty.length - 4);
	const formattedValue = new BigNumber(value || 0)
		.div(new BigNumber('1000000000000000000'))
		.toString(10);
	const formatterOptions =
		counterparty && value
			? {
					messageId: `notify.watched['${eventCode}']`,
					values: {
						verb:
							eventCode === 'txConfirmed'
								? direction === 'incoming'
									? 'received'
									: 'sent'
								: direction === 'incoming'
								? 'receiving'
								: 'sending',
						formattedValue,
						preposition: direction === 'incoming' ? 'from' : 'to',
						counterpartyShortened,
						asset
					}
			  }
			: {
					messageId: `notify.transaction['${eventCode}']`,
					values: { formattedValue, asset }
			  };
	const formatter = get$1(_);
	const notificationDefaultMessages = en.notify;
	const typeKey = counterparty ? 'watched' : 'transaction';
	const notificationMessageType = notificationDefaultMessages[typeKey];
	const defaultMessage = notificationMessageType[eventCode];
	const message = formatter(formatterOptions.messageId, {
		values: formatterOptions.values,
		default: defaultMessage
	});
	let notification = {
		id: id || hash,
		type,
		key,
		network,
		startTime: startTime || Date.now(),
		eventCode,
		message,
		autoDismiss: typeToDismissTimeout(
			(typeof customization === 'object' && customization.type) || type
		)
	};
	if (typeof customization === 'object') {
		notification = { ...notification, ...customization };
	}
	return notification;
}
function eventToType(eventCode) {
	switch (eventCode) {
		case 'txSent':
		case 'txPool':
			return 'pending';
		case 'txSpeedUp':
		case 'txCancel':
		case 'txRequest':
		case 'txRepeat':
		case 'txAwaitingApproval':
		case 'txConfirmReminder':
		case 'txStallPending':
		case 'txStallConfirmed':
		case 'txStuck':
			return 'hint';
		case 'txError':
		case 'txSendFail':
		case 'txFailed':
		case 'txDropped':
		case 'nsfFail':
		case 'txUnderpriced':
			return 'error';
		case 'txConfirmed':
			return 'success';
		default:
			return 'hint';
	}
}
function typeToDismissTimeout(type) {
	switch (type) {
		case 'success':
		case 'hint':
			return 4000;
		default:
			return 0;
	}
}

let blocknativeSdk;
/**
 *
 * @returns SDK if apikey
 */
async function getBlocknativeSdk() {
	const { apiKey } = configuration;
	if (!apiKey) return null;
	if (!blocknativeSdk) {
		const { default: Blocknative } = await import('bnc-sdk');
		blocknativeSdk = Blocknative.multichain({
			apiKey: configuration.apiKey
		});
		blocknativeSdk.transactions$.subscribe(handleTransactionUpdates);
	}
	return blocknativeSdk;
}

async function disconnect(options) {
	const error = validateDisconnectOptions(options);
	if (error) {
		throw error;
	}
	const { label } = options;
	if (state.get().notify.enabled) {
		// handle unwatching addresses
		const sdk = await getBlocknativeSdk();
		if (sdk) {
			const wallet = state.get().wallets.find((wallet) => wallet.label === label);
			wallet.accounts.forEach(({ address }) => {
				sdk.unsubscribe({
					id: address,
					chainId: wallet.chains[0].id,
					timeout: 60000
				});
			});
		}
	}
	disconnectWallet$.next(label);
	removeWallet(label);
	return state.get().wallets;
}

const ethersProviders = {};
function getProvider(chain) {
	if (!chain) return null;
	if (!ethersProviders[chain.rpcUrl]) {
		ethersProviders[chain.rpcUrl] = new providers.StaticJsonRpcProvider(
			chain.providerConnectionInfo && chain.providerConnectionInfo.url
				? chain.providerConnectionInfo
				: chain.rpcUrl
		);
	}
	return ethersProviders[chain.rpcUrl];
}
function requestAccounts(provider) {
	const args = { method: 'eth_requestAccounts' };
	return provider.request(args);
}
function selectAccounts(provider) {
	const args = { method: 'eth_selectAccounts' };
	return provider.request(args);
}
function getChainId(provider) {
	return provider.request({ method: 'eth_chainId' });
}
function listenAccountsChanged(args) {
	const { provider, disconnected$ } = args;
	const addHandler = (handler) => {
		provider.on('accountsChanged', handler);
	};
	const removeHandler = (handler) => {
		provider.removeListener('accountsChanged', handler);
	};
	return fromEventPattern(addHandler, removeHandler).pipe(takeUntil(disconnected$));
}
function listenChainChanged(args) {
	const { provider, disconnected$ } = args;
	const addHandler = (handler) => {
		provider.on('chainChanged', handler);
	};
	const removeHandler = (handler) => {
		provider.removeListener('chainChanged', handler);
	};
	return fromEventPattern(addHandler, removeHandler).pipe(takeUntil(disconnected$));
}
function trackWallet(provider, label) {
	const disconnected$ = disconnectWallet$.pipe(
		filter((wallet) => wallet === label),
		take(1)
	);
	const accountsChanged$ = listenAccountsChanged({
		provider,
		disconnected$
	}).pipe(share());
	// when account changed, set it to first account and subscribe to events
	accountsChanged$.subscribe(async ([address]) => {
		// no address, then no account connected, so disconnect wallet
		// this could happen if user locks wallet,
		// or if disconnects app from wallet
		if (!address) {
			disconnect({ label });
			return;
		}
		const { wallets } = state.get();
		const { accounts } = wallets.find((wallet) => wallet.label === label);
		const [[existingAccount], restAccounts] = partition(
			accounts,
			(account) => account.address === address
		);
		// update accounts without ens and balance first
		updateWallet(label, {
			accounts: [existingAccount || { address: address, ens: null, balance: null }, ...restAccounts]
		});
		// if not existing account and notifications,
		// then subscribe to transaction events
		if (state.get().notify.enabled && !existingAccount) {
			const sdk = await getBlocknativeSdk();
			if (sdk) {
				const wallet = state.get().wallets.find((wallet) => wallet.label === label);
				try {
					sdk.subscribe({
						id: address,
						chainId: wallet.chains[0].id,
						type: 'account'
					});
				} catch (error) {
					// unsupported network for transaction events
				}
			}
		}
	});
	// also when accounts change, update Balance and ENS
	accountsChanged$
		.pipe(
			switchMap(async ([address]) => {
				if (!address) return;
				const { wallets, chains } = state.get();
				const { chains: walletChains, accounts } = wallets.find((wallet) => wallet.label === label);
				const [connectedWalletChain] = walletChains;
				const chain = chains.find(
					({ namespace, id }) => namespace === 'evm' && id === connectedWalletChain.id
				);
				const balanceProm = getBalance(address, chain);
				const account = accounts.find((account) => account.address === address);
				const ensProm = account.ens
					? Promise.resolve(account.ens)
					: validEnsChain(connectedWalletChain.id)
					? getEns(address, chain)
					: Promise.resolve(null);
				return Promise.all([Promise.resolve(address), balanceProm, ensProm]);
			})
		)
		.subscribe((res) => {
			if (!res) return;
			const [address, balance, ens] = res;
			updateAccount(label, address, { balance, ens });
		});
	const chainChanged$ = listenChainChanged({ provider, disconnected$ }).pipe(share());
	// Update chain on wallet when chainId changed
	chainChanged$.subscribe(async (chainId) => {
		const { wallets } = state.get();
		const { chains, accounts } = wallets.find((wallet) => wallet.label === label);
		const [connectedWalletChain] = chains;
		if (chainId === connectedWalletChain.id) return;
		if (state.get().notify.enabled) {
			const sdk = await getBlocknativeSdk();
			if (sdk) {
				const wallet = state.get().wallets.find((wallet) => wallet.label === label);
				// Unsubscribe with timeout of 60 seconds
				// to allow for any currently inflight transactions
				wallet.accounts.forEach(({ address }) => {
					sdk.unsubscribe({
						id: address,
						chainId: wallet.chains[0].id,
						timeout: 60000
					});
				});
				// resubscribe for new chainId
				wallet.accounts.forEach(({ address }) => {
					try {
						sdk.subscribe({
							id: address,
							chainId: chainId,
							type: 'account'
						});
					} catch (error) {
						// unsupported network for transaction events
					}
				});
			}
		}
		const resetAccounts = accounts.map(({ address }) => ({
			address,
			ens: null,
			balance: null
		}));
		updateWallet(label, {
			chains: [{ namespace: 'evm', id: chainId }],
			accounts: resetAccounts
		});
	});
	// when chain changes get ens and balance for each account for wallet
	chainChanged$
		.pipe(
			switchMap(async (chainId) => {
				const { wallets, chains } = state.get();
				const { accounts } = wallets.find((wallet) => wallet.label === label);
				const chain = chains.find(({ namespace, id }) => namespace === 'evm' && id === chainId);
				return Promise.all(
					accounts.map(async ({ address }) => {
						const balanceProm = getBalance(address, chain);
						const ensProm = validEnsChain(chainId) ? getEns(address, chain) : Promise.resolve(null);
						const [balance, ens] = await Promise.all([balanceProm, ensProm]);
						return {
							address,
							balance,
							ens
						};
					})
				);
			})
		)
		.subscribe((updatedAccounts) => {
			updatedAccounts && updateWallet(label, { accounts: updatedAccounts });
		});
	disconnected$.subscribe(() => {
		provider.disconnect && provider.disconnect();
	});
}
async function getEns(address, chain) {
	// chain we don't recognize and don't have a rpcUrl for requests
	if (!chain) return null;
	const provider = getProvider(chain);
	try {
		const name = await provider.lookupAddress(address);
		let ens = null;
		if (name) {
			const resolver = await provider.getResolver(name);
			if (resolver) {
				const [contentHash, avatar] = await Promise.all([
					resolver.getContentHash(),
					resolver.getAvatar()
				]);
				const getText = resolver.getText.bind(resolver);
				ens = {
					name,
					avatar,
					contentHash,
					getText
				};
			}
		}
		return ens;
	} catch (error) {
		console.error(error);
		return null;
	}
}
async function getBalance(address, chain) {
	// chain we don't recognize and don't have a rpcUrl for requests
	if (!chain) return null;
	const provider = getProvider(chain);
	try {
		const balanceWei = await provider.getBalance(address);
		return balanceWei ? { [chain.token || 'eth']: utils.formatEther(balanceWei) } : null;
	} catch (error) {
		console.error(error);
		return null;
	}
}
function switchChain(provider, chainId) {
	return provider.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId }]
	});
}
function addNewChain(provider, chain) {
	return provider.request({
		method: 'wallet_addEthereumChain',
		params: [
			{
				chainId: chain.id,
				chainName: chain.label,
				nativeCurrency: {
					name: chain.label,
					symbol: chain.token,
					decimals: 18
				},
				rpcUrls: [chain.publicRpcUrl || chain.rpcUrl],
				blockExplorerUrls: chain.blockExplorerUrl ? [chain.blockExplorerUrl] : undefined
			}
		]
	});
}

async function setChain(options) {
	const error = validateSetChainOptions(options);
	if (error) {
		throw error;
	}
	const { wallets, chains } = state.get();
	const { chainId, chainNamespace = 'evm', wallet: walletToSet } = options;
	// validate that chainId has been added to chains
	const chain = chains.find(({ namespace, id }) => namespace === chainNamespace && id === chainId);
	if (!chain) {
		throw new Error(
			`Chain with chainId: ${chainId} and chainNamespace: ${chainNamespace} has not been set and must be added when Onboard is initialized.`
		);
	}
	const wallet = walletToSet ? wallets.find(({ label }) => label === walletToSet) : wallets[0];
	// validate a wallet is connected
	if (!wallet) {
		throw new Error(
			walletToSet
				? `Wallet with label ${walletToSet} is not connected`
				: 'A wallet must be connected before a chain can be set'
		);
	}
	const [walletConnectedChain] = wallet.chains;
	// check if wallet is already connected to chainId
	if (walletConnectedChain.namespace === chainNamespace && walletConnectedChain.id === chainId) {
		return true;
	}
	try {
		await switchChain(wallet.provider, chainId);
		return true;
	} catch (error) {
		const { code } = error;
		const switchChainModalClosed$ = switchChainModal$.pipe(
			filter((x) => x === null),
			mapTo(false)
		);
		if (code === ProviderRpcErrorCode.CHAIN_NOT_ADDED) {
			// chain has not been added to wallet
			try {
				await addNewChain(wallet.provider, chain);
				await switchChain(wallet.provider, chainId);
				return true;
			} catch (error) {
				// display notification to user to switch chain
				switchChainModal$.next({ chain });
				return firstValueFrom(switchChainModalClosed$);
			}
		}
		if (code === ProviderRpcErrorCode.UNSUPPORTED_METHOD) {
			// method not supported
			switchChainModal$.next({ chain });
			return firstValueFrom(switchChainModalClosed$);
		}
	}
	return false;
}

function initialize(options) {
	if (options) {
		const { en: customizedEn } = options;
		const merged = merge(en, customizedEn || {});
		addMessages('en', merged);
		const customLocales = Object.keys(options).filter((key) => key !== 'en');
		// Sync register all customLocales
		customLocales.forEach((locale) => {
			const dictionary = options[locale];
			dictionary && addMessages(locale, dictionary);
		});
	} else {
		addMessages('en', en);
	}
	init$2({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
}

var closeIcon$1 = `
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
  </svg>
`;

/* src/views/shared/CloseButton.svelte generated by Svelte v3.48.0 */

function add_css$t(target) {
	append_styles(
		target,
		'svelte-sj4h3i',
		'.close-button.svelte-sj4h3i{padding:0.25rem;border-radius:40px;color:var(\n      --onboard-close-button-color,\n      var(--onboard-gray-600, var(--gray-600))\n    )}'
	);
}

function create_fragment$u(ctx) {
	let div2;
	let div1;
	let div0;
	let div1_style_value;

	return {
		c() {
			div2 = element('div');
			div1 = element('div');
			div0 = element('div');
			attr(div0, 'class', 'flex items-center');
			set_style(div0, 'width', /*width*/ ctx[0]);
			attr(div1, 'class', 'close-button flex justify-center items-center svelte-sj4h3i');
			attr(div1, 'style', (div1_style_value = `background:${/*backgroundColor*/ ctx[1]}`));
			attr(div2, 'class', 'flex justify-center items-center pointer');
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			div0.innerHTML = closeIcon$1;
		},
		p(ctx, [dirty]) {
			if (dirty & /*width*/ 1) {
				set_style(div0, 'width', /*width*/ ctx[0]);
			}

			if (
				dirty & /*backgroundColor*/ 2 &&
				div1_style_value !== (div1_style_value = `background:${/*backgroundColor*/ ctx[1]}`)
			) {
				attr(div1, 'style', div1_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

function instance$u($$self, $$props, $$invalidate) {
	let { width = '24px' } = $$props;

	let {
		backgroundColor = `var(
      --onboard-close-button-background,
      var(--onboard-gray-100, var(--gray-100))
    );`
	} = $$props;

	$$self.$$set = ($$props) => {
		if ('width' in $$props) $$invalidate(0, (width = $$props.width));
		if ('backgroundColor' in $$props) $$invalidate(1, (backgroundColor = $$props.backgroundColor));
	};

	return [width, backgroundColor];
}

class CloseButton extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$u,
			create_fragment$u,
			safe_not_equal,
			{ width: 0, backgroundColor: 1 },
			add_css$t
		);
	}
}

function cubicOut(t) {
	const f = t - 1.0;
	return f * f * f + 1.0;
}
function quartOut(t) {
	return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
	const o = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * o}`
	};
}
function fly(
	node,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}
) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
	};
}

/* src/views/shared/Modal.svelte generated by Svelte v3.48.0 */

function add_css$s(target) {
	append_styles(
		target,
		'svelte-101xq62',
		'section.svelte-101xq62{top:0;left:0;pointer-events:none;z-index:var(--onboard-modal-z-index, var(--modal-z-index))}.background.svelte-101xq62{width:100vw;height:100vh;background:var(--onboard-modal-backdrop, var(--modal-backdrop));pointer-events:all}.max-height.svelte-101xq62{max-height:calc(100vh - 2rem)}.modal-position.svelte-101xq62{top:var(--onboard-modal-top, var(--modal-top));bottom:var(--onboard-modal-bottom, var(--modal-bottom));left:var(--onboard-modal-left, var(--modal-left));right:var(--onboard-modal-right, var(--modal-right))}.modal-overflow.svelte-101xq62{overflow:hidden}.modal-styling.svelte-101xq62{border-radius:var(--onboard-modal-border-radius, var(--border-radius-1));box-shadow:var(--onboard-modal-box-shadow, var(--box-shadow-0))}.modal.svelte-101xq62{border-radius:var(--onboard-modal-border-radius, var(--border-radius-1));overflow-y:auto;background:white}@media all and (max-width: 520px){.relative.svelte-101xq62{width:100vw}.modal-overflow.svelte-101xq62{width:100%}.modal.svelte-101xq62{width:100%;margin:0 16px}}'
	);
}

function create_fragment$t(ctx) {
	let section;
	let div4;
	let div3;
	let div2;
	let div1;
	let div0;
	let section_transition;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	return {
		c() {
			section = element('section');
			div4 = element('div');
			div3 = element('div');
			div2 = element('div');
			div1 = element('div');
			div0 = element('div');
			if (default_slot) default_slot.c();
			attr(div0, 'class', 'modal relative svelte-101xq62');
			attr(
				div1,
				'class',
				'modal-overflow modal-styling relative flex justify-center svelte-101xq62'
			);
			attr(div2, 'class', 'flex relative max-height svelte-101xq62');
			attr(div3, 'class', 'flex modal-position absolute svelte-101xq62');
			attr(div4, 'class', 'background flex items-center justify-center relative svelte-101xq62');
			attr(section, 'class', 'fixed svelte-101xq62');
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div4);
			append(div4, div3);
			append(div3, div2);
			append(div2, div1);
			append(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(div2, 'click', stop_propagation(/*click_handler*/ ctx[3])),
					listen(div4, 'click', function () {
						if (is_function(/*close*/ ctx[0])) /*close*/ ctx[0].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
							? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
							: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);

			add_render_callback(() => {
				if (!section_transition)
					section_transition = create_bidirectional_transition(section, fade, {}, true);
				section_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			if (!section_transition)
				section_transition = create_bidirectional_transition(section, fade, {}, false);
			section_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if (default_slot) default_slot.d(detaching);
			if (detaching && section_transition) section_transition.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$t($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	const { device } = configuration;
	const body = document.body;
	const html = document.documentElement;

	const trackYScrollPosition = () => {
		document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
	};

	onMount(() => {
		window.addEventListener('scroll', trackYScrollPosition, { passive: true });
		const scrollY = html.style.getPropertyValue('--scroll-y');

		device.type === 'mobile' ? (html.style.position = 'fixed') : (html.style.overflow = 'hidden');

		body.style.top = `-${scrollY}`;
	});

	onDestroy(() => {
		device.type === 'mobile' ? (html.style.position = '') : (html.style.overflow = 'auto');

		const scrollY = body.style.top;
		body.style.top = '';
		window.scrollTo(0, parseInt(scrollY || '0') * -1);
		window.removeEventListener('scroll', trackYScrollPosition);
	});

	let { close } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = ($$props) => {
		if ('close' in $$props) $$invalidate(0, (close = $$props.close));
		if ('$$scope' in $$props) $$invalidate(1, ($$scope = $$props.$$scope));
	};

	return [close, $$scope, slots, click_handler];
}

class Modal extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$t, create_fragment$t, safe_not_equal, { close: 0 }, add_css$s);
	}
}

/* src/views/connect/Agreement.svelte generated by Svelte v3.48.0 */

function add_css$r(target) {
	append_styles(
		target,
		'svelte-wp0cfb',
		'.container.svelte-wp0cfb{padding:var(--onboard-spacing-4, var(--spacing-4));font-size:var(--onboard-font-size-6, var(--font-size-6));line-height:24px}input.svelte-wp0cfb{height:1rem;width:1rem;margin-right:0.5rem}.spacer.svelte-wp0cfb{padding-top:var(--onboard-spacing-4, var(--spacing-4))}'
	);
}

// (62:0) {:else}
function create_else_block$8(ctx) {
	let div;

	return {
		c() {
			div = element('div');
			attr(div, 'class', 'spacer svelte-wp0cfb');
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (43:0) {#if showTermsOfService}
function create_if_block$j(ctx) {
	let div;
	let label;
	let input;
	let t0;
	let span;
	let t1_value = /*$_*/ ctx[1]('connect.selectingWallet.agreement.agree') + '';
	let t1;
	let t2;
	let t3_value = ' ' + '';
	let t3;
	let t4;
	let t5;
	let mounted;
	let dispose;
	let if_block0 = /*termsUrl*/ ctx[2] && create_if_block_2$7(ctx);
	let if_block1 = /*privacyUrl*/ ctx[3] && create_if_block_1$a(ctx);

	return {
		c() {
			div = element('div');
			label = element('label');
			input = element('input');
			t0 = space();
			span = element('span');
			t1 = text(t1_value);
			t2 = space();
			t3 = text(t3_value);
			t4 = space();
			if (if_block0) if_block0.c();
			t5 = space();
			if (if_block1) if_block1.c();
			attr(input, 'class', ' svelte-wp0cfb');
			attr(input, 'type', 'checkbox');
			attr(label, 'class', 'flex items-center');
			attr(div, 'class', 'container flex items-center svelte-wp0cfb');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label);
			append(label, input);
			input.checked = /*agreed*/ ctx[0];
			append(label, t0);
			append(label, span);
			append(span, t1);
			append(span, t2);
			append(span, t3);
			append(span, t4);
			if (if_block0) if_block0.m(span, null);
			append(span, t5);
			if (if_block1) if_block1.m(span, null);

			if (!mounted) {
				dispose = listen(input, 'change', /*input_change_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*agreed*/ 1) {
				input.checked = /*agreed*/ ctx[0];
			}

			if (
				dirty & /*$_*/ 2 &&
				t1_value !== (t1_value = /*$_*/ ctx[1]('connect.selectingWallet.agreement.agree') + '')
			)
				set_data(t1, t1_value);
			if (/*termsUrl*/ ctx[2]) if_block0.p(ctx, dirty);
			if (/*privacyUrl*/ ctx[3]) if_block1.p(ctx, dirty);
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};
}

// (50:8) {#if termsUrl}
function create_if_block_2$7(ctx) {
	let a;
	let t0_value = /*$_*/ ctx[1]('connect.selectingWallet.agreement.terms') + '';
	let t0;

	let t1_value =
		/*privacyUrl*/ (ctx[3]
			? ' ' + /*$_*/ ctx[1]('connect.selectingWallet.agreement.and') + ' '
			: '.') + '';

	let t1;

	return {
		c() {
			a = element('a');
			t0 = text(t0_value);
			t1 = text(t1_value);
			attr(a, 'href', /*termsUrl*/ ctx[2]);
			attr(a, 'target', '_blank');
		},
		m(target, anchor) {
			insert(target, a, anchor);
			append(a, t0);
			insert(target, t1, anchor);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 2 &&
				t0_value !== (t0_value = /*$_*/ ctx[1]('connect.selectingWallet.agreement.terms') + '')
			)
				set_data(t0, t0_value);

			if (
				dirty & /*$_*/ 2 &&
				t1_value !==
					(t1_value =
						/*privacyUrl*/ (ctx[3]
							? ' ' + /*$_*/ ctx[1]('connect.selectingWallet.agreement.and') + ' '
							: '.') + '')
			)
				set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(a);
			if (detaching) detach(t1);
		}
	};
}

// (56:8) {#if privacyUrl}
function create_if_block_1$a(ctx) {
	let a;
	let t0_value = /*$_*/ ctx[1]('connect.selectingWallet.agreement.privacy') + '';
	let t0;
	let t1;

	return {
		c() {
			a = element('a');
			t0 = text(t0_value);
			t1 = text('.');
			attr(a, 'href', /*privacyUrl*/ ctx[3]);
			attr(a, 'target', '_blank');
		},
		m(target, anchor) {
			insert(target, a, anchor);
			append(a, t0);
			insert(target, t1, anchor);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 2 &&
				t0_value !== (t0_value = /*$_*/ ctx[1]('connect.selectingWallet.agreement.privacy') + '')
			)
				set_data(t0, t0_value);
		},
		d(detaching) {
			if (detaching) detach(a);
			if (detaching) detach(t1);
		}
	};
}

function create_fragment$s(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*showTermsOfService*/ ctx[4]) return create_if_block$j;
		return create_else_block$8;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if_block.p(ctx, dirty);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$s($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(1, ($_ = $$value)));
	let { agreed } = $$props;
	const {
		terms: termsAgreed,
		privacy: privacyAgreed,
		version: versionAgreed
	} = JSON.parse(localStorage.getItem(STORAGE_KEYS.TERMS_AGREEMENT) || '{}');

	const blankAgreement = {
		termsUrl: '',
		privacyUrl: '',
		version: ''
	};

	const { appMetadata } = configuration;
	const { termsUrl, privacyUrl, version } =
		(appMetadata && appMetadata.agreement) || blankAgreement;
	const showTermsOfService = !!(
		(termsUrl && !termsAgreed) ||
		(privacyUrl && !privacyAgreed) ||
		(version && version !== versionAgreed)
	);
	agreed = !showTermsOfService;

	function input_change_handler() {
		agreed = this.checked;
		$$invalidate(0, agreed);
	}

	$$self.$$set = ($$props) => {
		if ('agreed' in $$props) $$invalidate(0, (agreed = $$props.agreed));
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*agreed*/ 1) {
			if (agreed) {
				localStorage.setItem(
					STORAGE_KEYS.TERMS_AGREEMENT,
					JSON.stringify({
						version,
						terms: !!termsUrl,
						privacy: !!privacyUrl
					})
				);
			} else if (agreed === false) {
				localStorage.removeItem(STORAGE_KEYS.TERMS_AGREEMENT);
			}
		}
	};

	return [agreed, $_, termsUrl, privacyUrl, showTermsOfService, input_change_handler];
}

class Agreement extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$s, create_fragment$s, safe_not_equal, { agreed: 0 }, add_css$r);
	}
}

var success = `
  <svg width="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.74999 12.15L3.59999 9L2.54999 10.05L6.74999 14.25L15.75 5.25L14.7 4.2L6.74999 12.15Z" fill="currentColor"/>
  </svg>
`;

/* src/views/shared/Spinner.svelte generated by Svelte v3.48.0 */

function add_css$q(target) {
	append_styles(
		target,
		'svelte-1le5672',
		'.loading-container.svelte-1le5672.svelte-1le5672{font-family:inherit;font-size:inherit;color:inherit}span.svelte-1le5672.svelte-1le5672{font-family:inherit;font-size:0.889em;margin-top:1rem}.loading.svelte-1le5672.svelte-1le5672{display:inline-block}.loading.svelte-1le5672 div.svelte-1le5672{font-size:inherit;display:block;position:absolute;border:3px solid;border-radius:50%;animation:svelte-1le5672-bn-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:currentColor transparent transparent transparent}.loading.svelte-1le5672 .loading-first.svelte-1le5672{animation-delay:-0.45s}.loading.svelte-1le5672 .loading-second.svelte-1le5672{animation-delay:-0.3s}.loading.svelte-1le5672 .loading-third.svelte-1le5672{animation-delay:-0.15s}@keyframes svelte-1le5672-bn-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}'
	);
}

// (63:2) {#if description}
function create_if_block$i(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element('span');
			t = text(/*description*/ ctx[0]);
			attr(span, 'class', 'svelte-1le5672');
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*description*/ 1) set_data(t, /*description*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment$r(ctx) {
	let div4;
	let div3;
	let div0;
	let div0_style_value;
	let t0;
	let div1;
	let div1_style_value;
	let t1;
	let div2;
	let div2_style_value;
	let div3_style_value;
	let t2;
	let if_block = /*description*/ ctx[0] && create_if_block$i(ctx);

	return {
		c() {
			div4 = element('div');
			div3 = element('div');
			div0 = element('div');
			t0 = space();
			div1 = element('div');
			t1 = space();
			div2 = element('div');
			t2 = space();
			if (if_block) if_block.c();
			attr(div0, 'class', 'loading-first svelte-1le5672');
			attr(
				div0,
				'style',
				(div0_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			);
			attr(div1, 'class', 'loading-second svelte-1le5672');
			attr(
				div1,
				'style',
				(div1_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			);
			attr(div2, 'class', 'loading-third svelte-1le5672');
			attr(
				div2,
				'style',
				(div2_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			);
			attr(div3, 'class', 'loading relative svelte-1le5672');
			attr(
				div3,
				'style',
				(div3_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			);
			attr(
				div4,
				'class',
				'loading-container flex flex-column justify-center items-center absolute svelte-1le5672'
			);
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			append(div4, div3);
			append(div3, div0);
			append(div3, t0);
			append(div3, div1);
			append(div3, t1);
			append(div3, div2);
			append(div4, t2);
			if (if_block) if_block.m(div4, null);
		},
		p(ctx, [dirty]) {
			if (
				dirty & /*size*/ 2 &&
				div0_style_value !==
					(div0_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			) {
				attr(div0, 'style', div0_style_value);
			}

			if (
				dirty & /*size*/ 2 &&
				div1_style_value !==
					(div1_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			) {
				attr(div1, 'style', div1_style_value);
			}

			if (
				dirty & /*size*/ 2 &&
				div2_style_value !==
					(div2_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			) {
				attr(div2, 'style', div2_style_value);
			}

			if (
				dirty & /*size*/ 2 &&
				div3_style_value !==
					(div3_style_value = `height: ${/*size*/ ctx[1]}; width: ${/*size*/ ctx[1]};`)
			) {
				attr(div3, 'style', div3_style_value);
			}

			if (/*description*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$i(ctx);
					if_block.c();
					if_block.m(div4, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div4);
			if (if_block) if_block.d();
		}
	};
}

function instance$r($$self, $$props, $$invalidate) {
	let { description = '' } = $$props;
	let { size = '2rem' } = $$props;

	$$self.$$set = ($$props) => {
		if ('description' in $$props) $$invalidate(0, (description = $$props.description));
		if ('size' in $$props) $$invalidate(1, (size = $$props.size));
	};

	return [description, size];
}

class Spinner extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$r,
			create_fragment$r,
			safe_not_equal,
			{ description: 0, size: 1 },
			add_css$q
		);
	}
}

/* src/views/shared/WalletAppBadge.svelte generated by Svelte v3.48.0 */

function add_css$p(target) {
	append_styles(
		target,
		'svelte-1wcty06',
		'.icon.svelte-1wcty06{height:100%}.border-yellow.svelte-1wcty06{border:1px solid var(--onboard-warning-500, var(--warning-500))}.border-gray.svelte-1wcty06{border:1px solid var(--onboard-gray-400, var(--gray-400))}.border-green.svelte-1wcty06{border:1px solid var(--onboard-success-500, var(--success-500))}.border-dark-green.svelte-1wcty06{border:1px solid var(--onboard-success-700, var(--success-700))}.border-blue.svelte-1wcty06{border:1px solid\n      var(\n        --onboard-wallet-app-icon-border-color,\n        var(--onboard-primary-300, var(--primary-300))\n      )}.border-dark-blue.svelte-1wcty06{border:1px solid\n      var(\n        --onboard-wallet-app-icon-border-color,\n        var(--onboard-primary-600, var(--primary-600))\n      )}.border-transparent.svelte-1wcty06{border:1px solid transparent}.border-black.svelte-1wcty06{border:1px solid var(--onboard-gray-600, var(--gray-600))}.background-gray.svelte-1wcty06{background:var(--onboard-gray-500, var(--gray-500))}.background-light-gray.svelte-1wcty06{background:var(--onboard-gray-100, var(--gray-100))}.background-light-blue.svelte-1wcty06{background:var(--onboard-primary-100, var(--primary-100))}.background-green.svelte-1wcty06{background:var(--onboard-success-100, var(--success-100))}.background-white.svelte-1wcty06{background:var(--onboard-white, var(--white))}.background-transparent.svelte-1wcty06{background:transparent}@keyframes svelte-1wcty06-pulse{from{opacity:0}to{opacity:1}}.placeholder-icon.svelte-1wcty06{width:100%;height:100%;background:var(--onboard-gray-100, var(--gray-100));border-radius:32px;animation:svelte-1wcty06-pulse infinite 750ms alternate ease-in-out}.spinner-container.svelte-1wcty06{color:var(--onboard-primary-300, var(--primary-300))}img.svelte-1wcty06{max-width:100%;height:auto}'
	);
}

const get_status_slot_changes = (dirty) => ({});
const get_status_slot_context = (ctx) => ({});

// (138:2) {:else}
function create_else_block$7(ctx) {
	let await_block_anchor;
	let promise;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 11
	};

	handle_promise((promise = /*icon*/ ctx[1]), info);

	return {
		c() {
			await_block_anchor = empty();
			info.block.c();
		},
		m(target, anchor) {
			insert(target, await_block_anchor, anchor);
			info.block.m(target, (info.anchor = anchor));
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (
				dirty & /*icon*/ 2 &&
				promise !== (promise = /*icon*/ ctx[1]) &&
				handle_promise(promise, info)
			);
			else {
				update_await_block_branch(info, ctx, dirty);
			}
		},
		i(local) {
			transition_in(info.block);
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};
}

// (134:2) {#if loading}
function create_if_block$h(ctx) {
	let div;
	let spinner;
	let current;
	spinner = new Spinner({ props: { size: '2rem' } });

	return {
		c() {
			div = element('div');
			create_component(spinner.$$.fragment);
			attr(div, 'class', 'spinner-container svelte-1wcty06');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(spinner, div, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(spinner.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(spinner.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(spinner);
		}
	};
}

// (1:0) <script lang="ts">import { fade }
function create_catch_block(ctx) {
	return {
		c: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

// (141:4) {:then iconLoaded}
function create_then_block(ctx) {
	let div;
	let show_if;
	let div_intro;

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*icon*/ 2) show_if = null;
		if (show_if == null) show_if = !!isSVG(/*iconLoaded*/ ctx[11]);
		if (show_if) return create_if_block_1$9;
		return create_else_block_1$1;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element('div');
			if_block.c();
			attr(div, 'class', 'icon flex justify-center items-center svelte-1wcty06');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (
				current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) &&
				if_block
			) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i(local) {
			if (!div_intro) {
				add_render_callback(() => {
					div_intro = create_in_transition(div, fade, {});
					div_intro.start();
				});
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

// (146:8) {:else}
function create_else_block_1$1(ctx) {
	let img;
	let img_src_value;

	return {
		c() {
			img = element('img');
			if (!src_url_equal(img.src, (img_src_value = /*iconLoaded*/ ctx[11])))
				attr(img, 'src', img_src_value);
			attr(img, 'alt', 'logo');
			attr(img, 'class', 'svelte-1wcty06');
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*icon*/ 2 && !src_url_equal(img.src, (img_src_value = /*iconLoaded*/ ctx[11]))) {
				attr(img, 'src', img_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
		}
	};
}

// (143:8) {#if isSVG(iconLoaded)}
function create_if_block_1$9(ctx) {
	let html_tag;
	let raw_value = /*iconLoaded*/ ctx[11] + '';
	let html_anchor;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(raw_value, target, anchor);
			insert(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*icon*/ 2 && raw_value !== (raw_value = /*iconLoaded*/ ctx[11] + ''))
				html_tag.p(raw_value);
		},
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (139:17)        <div class="placeholder-icon" />     {:then iconLoaded}
function create_pending_block(ctx) {
	let div;

	return {
		c() {
			div = element('div');
			attr(div, 'class', 'placeholder-icon svelte-1wcty06');
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$q(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let t;
	let div_style_value;
	let current;
	const if_block_creators = [create_if_block$h, create_else_block$7];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*loading*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const status_slot_template = /*#slots*/ ctx[10].status;
	const status_slot = create_slot(
		status_slot_template,
		ctx,
		/*$$scope*/ ctx[9],
		get_status_slot_context
	);

	return {
		c() {
			div = element('div');
			if_block.c();
			t = space();
			if (status_slot) status_slot.c();
			attr(div, 'class', 'relative svelte-1wcty06');

			attr(
				div,
				'style',
				(div_style_value = `${
					/*background*/ ctx[6] === 'custom'
						? `background-color: ${/*customBackgroundColor*/ ctx[7]}`
						: ''
				}; padding: ${/*padding*/ ctx[3] - 1}px; width: ${/*size*/ ctx[0]}px; height: ${
					/*size*/ ctx[0]
				}px; border-radius: ${/*radius*/ ctx[8]}px; color: ${/*color*/ ctx[4]};`)
			);

			toggle_class(div, 'border-yellow', /*border*/ ctx[5] === 'yellow');
			toggle_class(div, 'border-gray', /*border*/ ctx[5] === 'gray');
			toggle_class(div, 'border-green', /*border*/ ctx[5] === 'green');
			toggle_class(div, 'border-dark-green', /*border*/ ctx[5] === 'darkGreen');
			toggle_class(div, 'border-blue', /*border*/ ctx[5] === 'blue');
			toggle_class(div, 'border-dark-blue', /*border*/ ctx[5] === 'darkBlue');
			toggle_class(div, 'border-transparent', /*border*/ ctx[5] === 'transparent');
			toggle_class(div, 'border-black', /*border*/ ctx[5] === 'black');
			toggle_class(div, 'background-gray', /*background*/ ctx[6] === 'gray');
			toggle_class(div, 'background-light-gray', /*background*/ ctx[6] === 'lightGray');
			toggle_class(div, 'background-light-blue', /*background*/ ctx[6] === 'lightBlue');
			toggle_class(div, 'background-green', /*background*/ ctx[6] === 'green');
			toggle_class(div, 'background-white', /*background*/ ctx[6] === 'white');
			toggle_class(div, 'background-transparent', /*background*/ ctx[6] === 'transparent');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			append(div, t);

			if (status_slot) {
				status_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] =
						if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, t);
			}

			if (status_slot) {
				if (status_slot.p && (!current || dirty & /*$$scope*/ 512)) {
					update_slot_base(
						status_slot,
						status_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
							? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
							: get_slot_changes(
									status_slot_template,
									/*$$scope*/ ctx[9],
									dirty,
									get_status_slot_changes
							  ),
						get_status_slot_context
					);
				}
			}

			if (
				!current ||
				(dirty & /*background, customBackgroundColor, padding, size, radius, color*/ 473 &&
					div_style_value !==
						(div_style_value = `${
							/*background*/ ctx[6] === 'custom'
								? `background-color: ${/*customBackgroundColor*/ ctx[7]}`
								: ''
						}; padding: ${/*padding*/ ctx[3] - 1}px; width: ${/*size*/ ctx[0]}px; height: ${
							/*size*/ ctx[0]
						}px; border-radius: ${/*radius*/ ctx[8]}px; color: ${/*color*/ ctx[4]};`))
			) {
				attr(div, 'style', div_style_value);
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-yellow', /*border*/ ctx[5] === 'yellow');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-gray', /*border*/ ctx[5] === 'gray');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-green', /*border*/ ctx[5] === 'green');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-dark-green', /*border*/ ctx[5] === 'darkGreen');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-blue', /*border*/ ctx[5] === 'blue');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-dark-blue', /*border*/ ctx[5] === 'darkBlue');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-transparent', /*border*/ ctx[5] === 'transparent');
			}

			if (dirty & /*border*/ 32) {
				toggle_class(div, 'border-black', /*border*/ ctx[5] === 'black');
			}

			if (dirty & /*background*/ 64) {
				toggle_class(div, 'background-gray', /*background*/ ctx[6] === 'gray');
			}

			if (dirty & /*background*/ 64) {
				toggle_class(div, 'background-light-gray', /*background*/ ctx[6] === 'lightGray');
			}

			if (dirty & /*background*/ 64) {
				toggle_class(div, 'background-light-blue', /*background*/ ctx[6] === 'lightBlue');
			}

			if (dirty & /*background*/ 64) {
				toggle_class(div, 'background-green', /*background*/ ctx[6] === 'green');
			}

			if (dirty & /*background*/ 64) {
				toggle_class(div, 'background-white', /*background*/ ctx[6] === 'white');
			}

			if (dirty & /*background*/ 64) {
				toggle_class(div, 'background-transparent', /*background*/ ctx[6] === 'transparent');
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(status_slot, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(status_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if_blocks[current_block_type_index].d();
			if (status_slot) status_slot.d(detaching);
		}
	};
}

function instance$q($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { size } = $$props;
	let { icon } = $$props;
	let { loading = false } = $$props;
	let { padding = size / 6 } = $$props;
	let { color = 'black' } = $$props;
	let { border = 'transparent' } = $$props;
	let { background = 'transparent' } = $$props;
	let { customBackgroundColor = '' } = $$props;
	let { radius = 12 } = $$props;

	$$self.$$set = ($$props) => {
		if ('size' in $$props) $$invalidate(0, (size = $$props.size));
		if ('icon' in $$props) $$invalidate(1, (icon = $$props.icon));
		if ('loading' in $$props) $$invalidate(2, (loading = $$props.loading));
		if ('padding' in $$props) $$invalidate(3, (padding = $$props.padding));
		if ('color' in $$props) $$invalidate(4, (color = $$props.color));
		if ('border' in $$props) $$invalidate(5, (border = $$props.border));
		if ('background' in $$props) $$invalidate(6, (background = $$props.background));
		if ('customBackgroundColor' in $$props)
			$$invalidate(7, (customBackgroundColor = $$props.customBackgroundColor));
		if ('radius' in $$props) $$invalidate(8, (radius = $$props.radius));
		if ('$$scope' in $$props) $$invalidate(9, ($$scope = $$props.$$scope));
	};

	return [
		size,
		icon,
		loading,
		padding,
		color,
		border,
		background,
		customBackgroundColor,
		radius,
		$$scope,
		slots
	];
}

class WalletAppBadge extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$q,
			create_fragment$q,
			safe_not_equal,
			{
				size: 0,
				icon: 1,
				loading: 2,
				padding: 3,
				color: 4,
				border: 5,
				background: 6,
				customBackgroundColor: 7,
				radius: 8
			},
			add_css$p
		);
	}
}

/* src/views/shared/SuccessStatusIcon.svelte generated by Svelte v3.48.0 */

function add_css$o(target) {
	append_styles(
		target,
		'svelte-1bikw7k',
		'.icon.svelte-1bikw7k{color:var(--onboard-white, var(--white));border-radius:50px}.green.svelte-1bikw7k{background:var(--onboard-success-600, var(--success-600))}.blue.svelte-1bikw7k{background:var(--onboard-primary-1, var(--primary-1))}'
	);
}

function create_fragment$p(ctx) {
	let div;
	let div_style_value;

	return {
		c() {
			div = element('div');
			attr(div, 'class', 'icon flex svelte-1bikw7k');
			attr(
				div,
				'style',
				(div_style_value = `width: ${/*size*/ ctx[0]}px; height: ${/*size*/ ctx[0]}px; padding: ${
					/*size*/ ctx[0] / 5
				}px;`)
			);
			toggle_class(div, 'green', /*color*/ ctx[1] === 'green');
			toggle_class(div, 'blue', /*color*/ ctx[1] === 'blue');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div.innerHTML = success;
		},
		p(ctx, [dirty]) {
			if (
				dirty & /*size*/ 1 &&
				div_style_value !==
					(div_style_value = `width: ${/*size*/ ctx[0]}px; height: ${/*size*/ ctx[0]}px; padding: ${
						/*size*/ ctx[0] / 5
					}px;`)
			) {
				attr(div, 'style', div_style_value);
			}

			if (dirty & /*color*/ 2) {
				toggle_class(div, 'green', /*color*/ ctx[1] === 'green');
			}

			if (dirty & /*color*/ 2) {
				toggle_class(div, 'blue', /*color*/ ctx[1] === 'blue');
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$p($$self, $$props, $$invalidate) {
	let { size } = $$props;
	let { color = 'green' } = $$props;

	$$self.$$set = ($$props) => {
		if ('size' in $$props) $$invalidate(0, (size = $$props.size));
		if ('color' in $$props) $$invalidate(1, (color = $$props.color));
	};

	return [size, color];
}

class SuccessStatusIcon extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$p,
			create_fragment$p,
			safe_not_equal,
			{ size: 0, color: 1 },
			add_css$o
		);
	}
}

/* src/views/connect/ConnectedWallet.svelte generated by Svelte v3.48.0 */

function add_css$n(target) {
	append_styles(
		target,
		'svelte-1knto2d',
		'.container.svelte-1knto2d{padding:var(--onboard-spacing-4, var(--spacing-4))}.connecting-container.svelte-1knto2d{padding:var(--onboard-spacing-4, var(--spacing-4));border-radius:24px;background:var(--onboard-success-100, var(--success-100));border:1px solid var(--onboard-success-600, var(--success-600));width:100%}.text.svelte-1knto2d{right:var(--onboard-spacing-5, var(--spacing-5))}.tick.svelte-1knto2d{color:var(--onboard-success-700, var(--success-700))}@media all and (max-width: 520px){}'
	);
}

function create_fragment$o(ctx) {
	let div7;
	let div6;
	let div4;
	let div2;
	let walletappbadge0;
	let t0;
	let div0;
	let successstatusicon;
	let t1;
	let div1;
	let walletappbadge1;
	let t2;
	let div3;

	let t3_value =
		/*$_*/ ctx[1]('connect.connectedWallet.mainText', {
			default: en.connect.connectedWallet.mainText
		}) + '';

	let t3;
	let t4;
	let div5;
	let current;

	walletappbadge0 = new WalletAppBadge({
		props: {
			size: 40,
			padding: 8,
			background: /*appMetadata*/ ctx[2] && /*appMetadata*/ ctx[2].icon ? 'lightBlue' : 'lightGray',
			border: 'darkGreen',
			icon: /*appMetadata*/ (ctx[2] && /*appMetadata*/ ctx[2].icon) || questionIcon
		}
	});

	successstatusicon = new SuccessStatusIcon({ props: { size: 17 } });

	walletappbadge1 = new WalletAppBadge({
		props: {
			size: 40,
			padding: 8,
			border: 'darkGreen',
			background: 'white',
			icon: /*selectedWallet*/ ctx[0].icon
		}
	});

	return {
		c() {
			div7 = element('div');
			div6 = element('div');
			div4 = element('div');
			div2 = element('div');
			create_component(walletappbadge0.$$.fragment);
			t0 = space();
			div0 = element('div');
			create_component(successstatusicon.$$.fragment);
			t1 = space();
			div1 = element('div');
			create_component(walletappbadge1.$$.fragment);
			t2 = space();
			div3 = element('div');
			t3 = text(t3_value);
			t4 = space();
			div5 = element('div');
			attr(div0, 'class', 'relative');
			set_style(div0, 'right', '1rem');
			set_style(div0, 'top', '4px');
			set_style(div0, 'z-index', '1');
			attr(div1, 'class', 'relative');
			set_style(div1, 'right', '1.75rem');
			attr(div2, 'class', 'flex justify-center items-end relative');
			attr(div3, 'class', 'text relative svelte-1knto2d');
			attr(div4, 'class', 'flex items-center');
			attr(div5, 'class', 'tick flex items-center svelte-1knto2d');
			set_style(div5, 'width', '24px');
			attr(div6, 'class', 'connecting-container flex justify-between items-center svelte-1knto2d');
			attr(div7, 'class', 'container svelte-1knto2d');
		},
		m(target, anchor) {
			insert(target, div7, anchor);
			append(div7, div6);
			append(div6, div4);
			append(div4, div2);
			mount_component(walletappbadge0, div2, null);
			append(div2, t0);
			append(div2, div0);
			mount_component(successstatusicon, div0, null);
			append(div2, t1);
			append(div2, div1);
			mount_component(walletappbadge1, div1, null);
			append(div4, t2);
			append(div4, div3);
			append(div3, t3);
			append(div6, t4);
			append(div6, div5);
			div5.innerHTML = success;
			current = true;
		},
		p(ctx, [dirty]) {
			const walletappbadge1_changes = {};
			if (dirty & /*selectedWallet*/ 1)
				walletappbadge1_changes.icon = /*selectedWallet*/ ctx[0].icon;
			walletappbadge1.$set(walletappbadge1_changes);

			if (
				(!current || dirty & /*$_*/ 2) &&
				t3_value !==
					(t3_value =
						/*$_*/ ctx[1]('connect.connectedWallet.mainText', {
							default: en.connect.connectedWallet.mainText
						}) + '')
			)
				set_data(t3, t3_value);
		},
		i(local) {
			if (current) return;
			transition_in(walletappbadge0.$$.fragment, local);
			transition_in(successstatusicon.$$.fragment, local);
			transition_in(walletappbadge1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(walletappbadge0.$$.fragment, local);
			transition_out(successstatusicon.$$.fragment, local);
			transition_out(walletappbadge1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div7);
			destroy_component(walletappbadge0);
			destroy_component(successstatusicon);
			destroy_component(walletappbadge1);
		}
	};
}

function instance$o($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(1, ($_ = $$value)));
	let { selectedWallet } = $$props;
	const { appMetadata } = configuration;

	$$self.$$set = ($$props) => {
		if ('selectedWallet' in $$props) $$invalidate(0, (selectedWallet = $$props.selectedWallet));
	};

	return [selectedWallet, $_, appMetadata];
}

class ConnectedWallet extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$o,
			create_fragment$o,
			safe_not_equal,
			{ selectedWallet: 0 },
			add_css$n
		);
	}
}

/* src/views/connect/ConnectingWallet.svelte generated by Svelte v3.48.0 */

function add_css$m(target) {
	append_styles(
		target,
		'svelte-1c0xedm',
		'.container.svelte-1c0xedm{padding:var(--onboard-spacing-4, var(--spacing-4))}.connecting-container.svelte-1c0xedm{width:100%;padding:var(--onboard-spacing-4, var(--spacing-4));transition:background-color 100ms ease-in-out,\n      border-color 100ms ease-in-out;border-radius:24px;background:var(--onboard-primary-100, var(--primary-100));border:1px solid;border-color:var(--onboard-primary-300, var(--primary-300));color:var(--onboard-gray-600, var(--gray-600))}.connecting-container.warning.svelte-1c0xedm{background:var(--onboard-warning-100, var(--warning-100));border-color:var(--onboard-warning-400, var(--warning-400))}.text.svelte-1c0xedm{line-height:16px;margin-bottom:var(--onboard-spacing-5, var(--spacing-5))}.text.text-rejected.svelte-1c0xedm{line-height:24px;margin-bottom:0}.subtext.svelte-1c0xedm{font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:16px}.rejected-cta.svelte-1c0xedm{color:var(--onboard-primary-500, var(--primary-500))}.onboard-button-primary.svelte-1c0xedm{bottom:var(--onboard-spacing-3, var(--spacing-3))}.ml.svelte-1c0xedm{margin-left:var(--onboard-spacing-4, var(--spacing-4))}'
	);
}

// (109:8) {:else}
function create_else_block$6(ctx) {
	let div;

	let t_value =
		/*$_*/ ctx[5]('connect.connectingWallet.paragraph', {
			default: en.connect.connectingWallet.paragraph
		}) + '';

	let t;

	return {
		c() {
			div = element('div');
			t = text(t_value);
			attr(div, 'class', 'subtext svelte-1c0xedm');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 32 &&
				t_value !==
					(t_value =
						/*$_*/ ctx[5]('connect.connectingWallet.paragraph', {
							default: en.connect.connectingWallet.paragraph
						}) + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (103:8) {#if connectionRejected}
function create_if_block$g(ctx) {
	let div;

	let t_value =
		/*$_*/ ctx[5]('connect.connectingWallet.rejectedCTA', {
			default: en.connect.connectingWallet.rejectedCTA
		}) + '';

	let t;
	let mounted;
	let dispose;

	return {
		c() {
			div = element('div');
			t = text(t_value);
			attr(div, 'class', 'rejected-cta pointer subtext svelte-1c0xedm');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);

			if (!mounted) {
				dispose = listen(div, 'click', function () {
					if (is_function(/*connectWallet*/ ctx[0]))
						/*connectWallet*/ ctx[0].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (
				dirty & /*$_*/ 32 &&
				t_value !==
					(t_value =
						/*$_*/ ctx[5]('connect.connectingWallet.rejectedCTA', {
							default: en.connect.connectingWallet.rejectedCTA
						}) + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$n(ctx) {
	let div6;
	let div5;
	let div4;
	let div1;
	let walletappbadge0;
	let t0;
	let div0;
	let walletappbadge1;
	let t1;
	let div3;
	let div2;

	let t2_value =
		/*$_*/ ctx[5](
			/*connectionRejected*/ ctx[4]
				? 'connect.connectingWallet.rejectedText'
				: 'connect.connectingWallet.mainText',
			{
				default: /*connectionRejected*/ ctx[4]
					? en.connect.connectingWallet.rejectedText
					: en.connect.connectingWallet.mainText
			}
		) + '';

	let t2;
	let t3;
	let t4;
	let button;

	let t5_value =
		/*$_*/ ctx[5]('connect.connectingWallet.primaryButton', {
			default: en.connect.connectingWallet.primaryButton
		}) + '';

	let t5;
	let current;
	let mounted;
	let dispose;

	walletappbadge0 = new WalletAppBadge({
		props: {
			size: 40,
			padding: 8,
			icon: /*appMetadata*/ (ctx[6] && /*appMetadata*/ ctx[6].icon) || questionIcon,
			border: /*connectionRejected*/ ctx[4] ? 'yellow' : 'blue',
			background: 'lightGray'
		}
	});

	walletappbadge1 = new WalletAppBadge({
		props: {
			size: 40,
			padding: 8,
			border: /*connectionRejected*/ ctx[4] ? 'yellow' : 'blue',
			background: 'white',
			icon: /*selectedWallet*/ ctx[1].icon
		}
	});

	function select_block_type(ctx, dirty) {
		if (/*connectionRejected*/ ctx[4]) return create_if_block$g;
		return create_else_block$6;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div6 = element('div');
			div5 = element('div');
			div4 = element('div');
			div1 = element('div');
			create_component(walletappbadge0.$$.fragment);
			t0 = space();
			div0 = element('div');
			create_component(walletappbadge1.$$.fragment);
			t1 = space();
			div3 = element('div');
			div2 = element('div');
			t2 = text(t2_value);
			t3 = space();
			if_block.c();
			t4 = space();
			button = element('button');
			t5 = text(t5_value);
			attr(div0, 'class', 'relative');
			set_style(div0, 'right', '0.5rem');
			attr(div1, 'class', 'flex justify-center relative');
			attr(div2, 'class', 'text svelte-1c0xedm');
			toggle_class(div2, 'text-rejected', /*connectionRejected*/ ctx[4]);
			attr(div3, 'class', 'flex flex-column justify-center ml svelte-1c0xedm');
			attr(div4, 'class', 'flex');
			attr(div5, 'class', 'connecting-container flex justify-between items-center svelte-1c0xedm');
			toggle_class(div5, 'warning', /*connectionRejected*/ ctx[4]);
			attr(button, 'class', 'onboard-button-primary absolute svelte-1c0xedm');
			attr(div6, 'class', 'container flex flex-column items-center svelte-1c0xedm');
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div5);
			append(div5, div4);
			append(div4, div1);
			mount_component(walletappbadge0, div1, null);
			append(div1, t0);
			append(div1, div0);
			mount_component(walletappbadge1, div0, null);
			append(div4, t1);
			append(div4, div3);
			append(div3, div2);
			append(div2, t2);
			append(div3, t3);
			if_block.m(div3, null);
			append(div6, t4);
			append(div6, button);
			append(button, t5);
			current = true;

			if (!mounted) {
				dispose = listen(button, 'click', /*click_handler*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const walletappbadge0_changes = {};
			if (dirty & /*connectionRejected*/ 16)
				walletappbadge0_changes.border = /*connectionRejected*/ ctx[4] ? 'yellow' : 'blue';
			walletappbadge0.$set(walletappbadge0_changes);
			const walletappbadge1_changes = {};
			if (dirty & /*connectionRejected*/ 16)
				walletappbadge1_changes.border = /*connectionRejected*/ ctx[4] ? 'yellow' : 'blue';
			if (dirty & /*selectedWallet*/ 2)
				walletappbadge1_changes.icon = /*selectedWallet*/ ctx[1].icon;
			walletappbadge1.$set(walletappbadge1_changes);

			if (
				(!current || dirty & /*$_, connectionRejected*/ 48) &&
				t2_value !==
					(t2_value =
						/*$_*/ ctx[5](
							/*connectionRejected*/ ctx[4]
								? 'connect.connectingWallet.rejectedText'
								: 'connect.connectingWallet.mainText',
							{
								default: /*connectionRejected*/ ctx[4]
									? en.connect.connectingWallet.rejectedText
									: en.connect.connectingWallet.mainText
							}
						) + '')
			)
				set_data(t2, t2_value);

			if (dirty & /*connectionRejected*/ 16) {
				toggle_class(div2, 'text-rejected', /*connectionRejected*/ ctx[4]);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div3, null);
				}
			}

			if (dirty & /*connectionRejected*/ 16) {
				toggle_class(div5, 'warning', /*connectionRejected*/ ctx[4]);
			}

			if (
				(!current || dirty & /*$_*/ 32) &&
				t5_value !==
					(t5_value =
						/*$_*/ ctx[5]('connect.connectingWallet.primaryButton', {
							default: en.connect.connectingWallet.primaryButton
						}) + '')
			)
				set_data(t5, t5_value);
		},
		i(local) {
			if (current) return;
			transition_in(walletappbadge0.$$.fragment, local);
			transition_in(walletappbadge1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(walletappbadge0.$$.fragment, local);
			transition_out(walletappbadge1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div6);
			destroy_component(walletappbadge0);
			destroy_component(walletappbadge1);
			if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance$n($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(5, ($_ = $$value)));
	let { connectWallet } = $$props;
	let { selectedWallet } = $$props;
	let { deselectWallet } = $$props;
	let { setStep } = $$props;
	let { connectionRejected } = $$props;
	const { appMetadata } = configuration;

	const click_handler = () => {
		deselectWallet(selectedWallet.label);
		setStep('selectingWallet');
	};

	$$self.$$set = ($$props) => {
		if ('connectWallet' in $$props) $$invalidate(0, (connectWallet = $$props.connectWallet));
		if ('selectedWallet' in $$props) $$invalidate(1, (selectedWallet = $$props.selectedWallet));
		if ('deselectWallet' in $$props) $$invalidate(2, (deselectWallet = $$props.deselectWallet));
		if ('setStep' in $$props) $$invalidate(3, (setStep = $$props.setStep));
		if ('connectionRejected' in $$props)
			$$invalidate(4, (connectionRejected = $$props.connectionRejected));
	};

	return [
		connectWallet,
		selectedWallet,
		deselectWallet,
		setStep,
		connectionRejected,
		$_,
		appMetadata,
		click_handler
	];
}

class ConnectingWallet extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$n,
			create_fragment$n,
			safe_not_equal,
			{
				connectWallet: 0,
				selectedWallet: 1,
				deselectWallet: 2,
				setStep: 3,
				connectionRejected: 4
			},
			add_css$m
		);
	}
}

/* src/views/shared/Warning.svelte generated by Svelte v3.48.0 */

function add_css$l(target) {
	append_styles(
		target,
		'svelte-105a3pw',
		'.container.svelte-105a3pw{padding:var(--onboard-spacing-5, var(--spacing-5));color:var(--onboard-warning-700, var(--warning-700));font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:16px;border:1px solid var(--onboard-warning-400, var(--warning-400));background:var(--onboard-warning-100, var(--warning-100));margin:0;border-radius:12px}.icon.svelte-105a3pw{color:var(--onboard-warning-700, var(--warning-700));width:1rem;height:1rem;margin-left:var(--onboard-spacing-5, var(--spacing-5))}p.svelte-105a3pw{margin:0;width:fit-content}'
	);
}

function create_fragment$m(ctx) {
	let div1;
	let p;
	let t;
	let div0;
	let div1_intro;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div1 = element('div');
			p = element('p');
			if (default_slot) default_slot.c();
			t = space();
			div0 = element('div');
			attr(p, 'class', 'svelte-105a3pw');
			attr(div0, 'class', 'icon svelte-105a3pw');
			attr(div1, 'class', 'container flex justify-between svelte-105a3pw');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, p);

			if (default_slot) {
				default_slot.m(p, null);
			}

			append(div1, t);
			append(div1, div0);
			div0.innerHTML = infoIcon;
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
							? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
							: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (!div1_intro) {
				add_render_callback(() => {
					div1_intro = create_in_transition(div1, fade, {});
					div1_intro.start();
				});
			}

			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$m($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = ($$props) => {
		if ('$$scope' in $$props) $$invalidate(0, ($$scope = $$props.$$scope));
	};

	return [$$scope, slots];
}

class Warning extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$m, create_fragment$m, safe_not_equal, {}, add_css$l);
	}
}

/* src/views/connect/InstallWallet.svelte generated by Svelte v3.48.0 */

function add_css$k(target) {
	append_styles(
		target,
		'svelte-1uy2ffh',
		'.outer-container.svelte-1uy2ffh{padding:var(--onboard-spacing-4, var(--spacing-4))}.link.svelte-1uy2ffh{font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:16px;color:var(--onboard-primary-500, var(--primary-500));text-decoration:none}'
	);
}

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i].name;
	child_ctx[3] = list[i].url;
	child_ctx[5] = i;
	return child_ctx;
}

// (41:4) {:else}
function create_else_block$5(ctx) {
	let t_value =
		/*$_*/ ctx[0]('connect.selectingWallet.installWallet', {
			default: en.connect.selectingWallet.installWallet,
			values: { app: /*name*/ ctx[2] || 'this app' }
		}) + '';

	let t;

	return {
		c() {
			t = text(t_value);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 1 &&
				t_value !==
					(t_value =
						/*$_*/ ctx[0]('connect.selectingWallet.installWallet', {
							default: en.connect.selectingWallet.installWallet,
							values: { app: /*name*/ ctx[2] || 'this app' }
						}) + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (22:4) {#if recommendedInjectedWallets}
function create_if_block$f(ctx) {
	let t0_value =
		/*$_*/ ctx[0]('connect.selectingWallet.recommendedWalletsPart1', {
			default: en.connect.selectingWallet.recommendedWalletsPart1,
			values: { app: /*name*/ ctx[2] || 'This app' }
		}) + '';

	let t0;
	let t1;
	let t2;

	let t3_value =
		/*$_*/ ctx[0]('connect.selectingWallet.recommendedWalletsPart2', {
			default: en.connect.selectingWallet.recommendedWalletsPart2
		}) + '';

	let t3;
	let each_value = /*recommendedInjectedWallets*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	return {
		c() {
			t0 = text(t0_value);
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			t3 = text(t3_value);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, t2, anchor);
			insert(target, t3, anchor);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 1 &&
				t0_value !==
					(t0_value =
						/*$_*/ ctx[0]('connect.selectingWallet.recommendedWalletsPart1', {
							default: en.connect.selectingWallet.recommendedWalletsPart1,
							values: { app: /*name*/ ctx[2] || 'This app' }
						}) + '')
			)
				set_data(t0, t0_value);

			if (dirty & /*recommendedInjectedWallets*/ 2) {
				each_value = /*recommendedInjectedWallets*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t2.parentNode, t2);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (
				dirty & /*$_*/ 1 &&
				t3_value !==
					(t3_value =
						/*$_*/ ctx[0]('connect.selectingWallet.recommendedWalletsPart2', {
							default: en.connect.selectingWallet.recommendedWalletsPart2
						}) + '')
			)
				set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t2);
			if (detaching) detach(t3);
		}
	};
}

// (29:6) {#each recommendedInjectedWallets as { name, url }
function create_each_block$5(ctx) {
	let a;
	let t0_value = /*name*/ ctx[2] + '';
	let t0;

	let t1_value = /*i*/ (ctx[5] < /*recommendedInjectedWallets*/ ctx[1].length - 1 ? ', ' : '') + '';

	let t1;
	let a_href_value;

	return {
		c() {
			a = element('a');
			t0 = text(t0_value);
			t1 = text(t1_value);
			attr(a, 'class', 'link pointer svelte-1uy2ffh');
			attr(a, 'href', (a_href_value = /*url*/ ctx[3]));
			attr(a, 'target', '_blank');
			attr(a, 'rel', 'noreferrer noopener');
		},
		m(target, anchor) {
			insert(target, a, anchor);
			append(a, t0);
			append(a, t1);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(a);
		}
	};
}

// (21:2) <Warning>
function create_default_slot$5(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*recommendedInjectedWallets*/ ctx[1]) return create_if_block$f;
		return create_else_block$5;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if_block.p(ctx, dirty);
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$l(ctx) {
	let div;
	let warning;
	let current;

	warning = new Warning({
		props: {
			$$slots: { default: [create_default_slot$5] },
			$$scope: { ctx }
		}
	});

	return {
		c() {
			div = element('div');
			create_component(warning.$$.fragment);
			attr(div, 'class', 'outer-container svelte-1uy2ffh');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(warning, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const warning_changes = {};

			if (dirty & /*$$scope, $_*/ 65) {
				warning_changes.$$scope = { dirty, ctx };
			}

			warning.$set(warning_changes);
		},
		i(local) {
			if (current) return;
			transition_in(warning.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(warning.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(warning);
		}
	};
}

function instance$l($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(0, ($_ = $$value)));
	const { recommendedInjectedWallets, name } = configuration.appMetadata || {};
	return [$_, recommendedInjectedWallets, name];
}

class InstallWallet extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$l, create_fragment$l, safe_not_equal, {}, add_css$k);
	}
}

/* src/views/connect/WalletButton.svelte generated by Svelte v3.48.0 */

function add_css$j(target) {
	append_styles(
		target,
		'svelte-1hnpcft',
		'button.svelte-1hnpcft{background:var(\n      --onboard-wallet-button-background,\n      var(--onboard-white, var(--white))\n    );border:1px solid\n      var(\n        --onboard-wallet-button-border-color,\n        var(--onboard-primary-200, var(--primary-200))\n      );transition:background-color 250ms ease-in-out;color:var(\n      --onboard-wallet-button-color,\n      var(--onboard-gray-700, var(--gray-700))\n    )}button.svelte-1hnpcft:hover{background:var(\n      --onboard-wallet-button-background-hover,\n      var(--onboard-primary-100, var(--primary-100))\n    )}button.connected.svelte-1hnpcft{border:1px solid var(--onboard-success-200, var(--success-200))}button.connected.svelte-1hnpcft:hover{background:var(--onboard-success-100, var(--success-100))}.name.svelte-1hnpcft{margin-left:var(--onboard-spacing-4, var(--spacing-4))}button.wallet-button-styling.svelte-1hnpcft{border-radius:var(\n      --onboard-wallet-button-border-radius,\n      var(--border-radius-1)\n    );box-shadow:var(--onboard-wallet-button-box-shadow, var(--box-shadow-0))}'
	);
}

// (70:2) {#if connected}
function create_if_block$e(ctx) {
	let div;
	let successstatusicon;
	let current;
	successstatusicon = new SuccessStatusIcon({ props: { size: 16 } });

	return {
		c() {
			div = element('div');
			create_component(successstatusicon.$$.fragment);
			attr(div, 'class', 'absolute');
			set_style(div, 'right', '16px');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(successstatusicon, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(successstatusicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(successstatusicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(successstatusicon);
		}
	};
}

function create_fragment$k(ctx) {
	let button;
	let walletappbadge;
	let t0;
	let span;
	let t1;
	let t2;
	let button_intro;
	let current;
	let mounted;
	let dispose;

	walletappbadge = new WalletAppBadge({
		props: {
			size: 48,
			icon: /*icon*/ ctx[0],
			loading: /*connecting*/ ctx[4],
			border: /*connected*/ ctx[3] ? 'green' : 'blue',
			background: 'transparent'
		}
	});

	let if_block = /*connected*/ ctx[3] && create_if_block$e();

	return {
		c() {
			button = element('button');
			create_component(walletappbadge.$$.fragment);
			t0 = space();
			span = element('span');
			t1 = text(/*label*/ ctx[1]);
			t2 = space();
			if (if_block) if_block.c();
			attr(span, 'class', 'name svelte-1hnpcft');
			attr(button, 'class', 'relative justify-start wallet-button-styling svelte-1hnpcft');
			toggle_class(button, 'connected', /*connected*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			mount_component(walletappbadge, button, null);
			append(button, t0);
			append(button, span);
			append(span, t1);
			append(button, t2);
			if (if_block) if_block.m(button, null);
			current = true;

			if (!mounted) {
				dispose = listen(button, 'click', function () {
					if (is_function(/*onClick*/ ctx[2])) /*onClick*/ ctx[2].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			const walletappbadge_changes = {};
			if (dirty & /*icon*/ 1) walletappbadge_changes.icon = /*icon*/ ctx[0];
			if (dirty & /*connecting*/ 16) walletappbadge_changes.loading = /*connecting*/ ctx[4];
			if (dirty & /*connected*/ 8)
				walletappbadge_changes.border = /*connected*/ ctx[3] ? 'green' : 'blue';
			walletappbadge.$set(walletappbadge_changes);
			if (!current || dirty & /*label*/ 2) set_data(t1, /*label*/ ctx[1]);

			if (/*connected*/ ctx[3]) {
				if (if_block) {
					if (dirty & /*connected*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$e();
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(button, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*connected*/ 8) {
				toggle_class(button, 'connected', /*connected*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(walletappbadge.$$.fragment, local);
			transition_in(if_block);

			if (!button_intro) {
				add_render_callback(() => {
					button_intro = create_in_transition(button, fade, {});
					button_intro.start();
				});
			}

			current = true;
		},
		o(local) {
			transition_out(walletappbadge.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			destroy_component(walletappbadge);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance$k($$self, $$props, $$invalidate) {
	let { icon } = $$props;
	let { label } = $$props;
	let { onClick } = $$props;
	let { connected } = $$props;
	let { connecting } = $$props;

	$$self.$$set = ($$props) => {
		if ('icon' in $$props) $$invalidate(0, (icon = $$props.icon));
		if ('label' in $$props) $$invalidate(1, (label = $$props.label));
		if ('onClick' in $$props) $$invalidate(2, (onClick = $$props.onClick));
		if ('connected' in $$props) $$invalidate(3, (connected = $$props.connected));
		if ('connecting' in $$props) $$invalidate(4, (connecting = $$props.connecting));
	};

	return [icon, label, onClick, connected, connecting];
}

class WalletButton extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$k,
			create_fragment$k,
			safe_not_equal,
			{
				icon: 0,
				label: 1,
				onClick: 2,
				connected: 3,
				connecting: 4
			},
			add_css$j
		);
	}
}

/* src/views/connect/SelectingWallet.svelte generated by Svelte v3.48.0 */

function add_css$i(target) {
	append_styles(
		target,
		'svelte-11upx36',
		'.outer-container.svelte-11upx36{padding:var(--onboard-spacing-4, var(--spacing-4));padding-top:0}.wallets-container.svelte-11upx36{display:grid;grid-template-columns:repeat(var(--onboard-wallet-columns, 2), 1fr);gap:var(--onboard-spacing-5, var(--spacing-5));width:100%}.warning-container.svelte-11upx36{margin-bottom:1rem}@media all and (max-width: 520px){.wallets-container.svelte-11upx36{grid-template-columns:repeat(1, 1fr)}}'
	);
}

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (39:2) {#if connectingErrorMessage}
function create_if_block$d(ctx) {
	let div;
	let warning;
	let current;

	warning = new Warning({
		props: {
			$$slots: { default: [create_default_slot$4] },
			$$scope: { ctx }
		}
	});

	return {
		c() {
			div = element('div');
			create_component(warning.$$.fragment);
			attr(div, 'class', 'warning-container svelte-11upx36');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(warning, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const warning_changes = {};

			if (dirty & /*$$scope, connectingErrorMessage*/ 520) {
				warning_changes.$$scope = { dirty, ctx };
			}

			warning.$set(warning_changes);
		},
		i(local) {
			if (current) return;
			transition_in(warning.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(warning.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(warning);
		}
	};
}

// (41:6) <Warning>
function create_default_slot$4(ctx) {
	let html_tag;
	let html_anchor;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(/*connectingErrorMessage*/ ctx[3], target, anchor);
			insert(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*connectingErrorMessage*/ 8) html_tag.p(/*connectingErrorMessage*/ ctx[3]);
		},
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (46:4) {#each wallets as wallet}
function create_each_block$4(ctx) {
	let walletbutton;
	let current;

	function func() {
		return /*func*/ ctx[5](/*wallet*/ ctx[6]);
	}

	walletbutton = new WalletButton({
		props: {
			connected: /*checkConnected*/ ctx[4](/*wallet*/ ctx[6].label),
			connecting: /*connectingWalletLabel*/ ctx[2] === /*wallet*/ ctx[6].label,
			label: /*wallet*/ ctx[6].label,
			icon: /*wallet*/ ctx[6].icon,
			onClick: func
		}
	});

	return {
		c() {
			create_component(walletbutton.$$.fragment);
		},
		m(target, anchor) {
			mount_component(walletbutton, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const walletbutton_changes = {};
			if (dirty & /*wallets*/ 1)
				walletbutton_changes.connected = /*checkConnected*/ ctx[4](/*wallet*/ ctx[6].label);
			if (dirty & /*connectingWalletLabel, wallets*/ 5)
				walletbutton_changes.connecting =
					/*connectingWalletLabel*/ ctx[2] === /*wallet*/ ctx[6].label;
			if (dirty & /*wallets*/ 1) walletbutton_changes.label = /*wallet*/ ctx[6].label;
			if (dirty & /*wallets*/ 1) walletbutton_changes.icon = /*wallet*/ ctx[6].icon;
			if (dirty & /*selectWallet, wallets*/ 3) walletbutton_changes.onClick = func;
			walletbutton.$set(walletbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(walletbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(walletbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(walletbutton, detaching);
		}
	};
}

function create_fragment$j(ctx) {
	let div1;
	let t;
	let div0;
	let current;
	let if_block = /*connectingErrorMessage*/ ctx[3] && create_if_block$d(ctx);
	let each_value = /*wallets*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	const out = (i) =>
		transition_out(each_blocks[i], 1, 1, () => {
			each_blocks[i] = null;
		});

	return {
		c() {
			div1 = element('div');
			if (if_block) if_block.c();
			t = space();
			div0 = element('div');

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, 'class', 'wallets-container svelte-11upx36');
			attr(div1, 'class', 'outer-container flex flex-column svelte-11upx36');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			if (if_block) if_block.m(div1, null);
			append(div1, t);
			append(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (/*connectingErrorMessage*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*connectingErrorMessage*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$d(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*checkConnected, wallets, connectingWalletLabel, selectWallet*/ 23) {
				each_value = /*wallets*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div0, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(if_block);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$j($$self, $$props, $$invalidate) {
	let { wallets } = $$props;
	let { selectWallet } = $$props;
	let { connectingWalletLabel } = $$props;
	let { connectingErrorMessage } = $$props;

	function checkConnected(label) {
		const { wallets } = state.get();
		return !!wallets.find((wallet) => wallet.label === label);
	}

	const func = (wallet) => selectWallet(wallet);

	$$self.$$set = ($$props) => {
		if ('wallets' in $$props) $$invalidate(0, (wallets = $$props.wallets));
		if ('selectWallet' in $$props) $$invalidate(1, (selectWallet = $$props.selectWallet));
		if ('connectingWalletLabel' in $$props)
			$$invalidate(2, (connectingWalletLabel = $$props.connectingWalletLabel));
		if ('connectingErrorMessage' in $$props)
			$$invalidate(3, (connectingErrorMessage = $$props.connectingErrorMessage));
	};

	return [
		wallets,
		selectWallet,
		connectingWalletLabel,
		connectingErrorMessage,
		checkConnected,
		func
	];
}

class SelectingWallet extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$j,
			create_fragment$j,
			safe_not_equal,
			{
				wallets: 0,
				selectWallet: 1,
				connectingWalletLabel: 2,
				connectingErrorMessage: 3
			},
			add_css$i
		);
	}
}

var blocknative = `
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 790.34 114.51" width="100%">
  <defs>
    <style>.cls-1{fill:#262a3d;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}</style>
    <linearGradient id="linear-gradient" x1="694.45" y1="46.08" x2="741.39" y2="46.08" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#55ccfe"/><stop offset="1" stop-color="#5e93ef"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="694.45" y1="86.73" x2="788.33" y2="86.73" xlink:href="#linear-gradient"/>
  </defs>
  <polygon class="cls-1" points="710.09 86.73 694.45 59.63 725.74 59.63 725.74 59.63 741.39 86.73 710.09 86.73"/>
  <polygon class="cls-2" points="725.74 59.63 694.45 59.63 710.09 32.53 741.39 32.53 725.74 59.63"/>
  <polygon class="cls-1" points="757.03 59.63 741.39 32.53 710.09 32.53 694.45 5.43 757.03 5.43 788.33 59.63 757.03 59.63"/>
  <polygon class="cls-3" points="757.03 113.83 694.45 113.83 710.09 86.73 741.39 86.73 757.03 59.63 788.33 59.63 757.03 113.83"/>
  <path class="cls-1" d="M70.51,65.77c0,19.47-14.37,34.5-31.88,34.5-9.54,0-16.47-3.53-21.17-9.54v7.71H.6V6.87L17.46,1.68V40.82c4.7-6,11.63-9.54,21.17-9.54C56.14,31.28,70.51,46.3,70.51,65.77Zm-16.86,0c0-11-7.7-18.42-18.16-18.42s-18,7.45-18,18.42,7.71,18.43,18,18.43S53.65,76.75,53.65,65.77Z"/>
  <path class="cls-1" d="M78.09,6.87,94.94,1.68V98.44H78.09Z"/><path class="cls-1" d="M102.39,65.77a34.56,34.56,0,1,1,34.49,34.5A34.13,34.13,0,0,1,102.39,65.77Zm52.26,0c0-10.58-7.71-18-17.77-18s-17.64,7.45-17.64,18,7.71,18,17.64,18S154.65,76.36,154.65,65.77Z"/>
  <path class="cls-1" d="M177.9,65.77c0-19.47,14.63-34.49,34.49-34.49,12.81,0,23.91,6.79,29.27,16.85l-14.5,8.5c-2.62-5.36-8.24-8.76-14.9-8.76-10.06,0-17.51,7.45-17.51,17.9s7.45,17.77,17.51,17.77c6.8,0,12.41-3.26,15-8.62l14.63,8.36a33.47,33.47,0,0,1-29.53,17C192.53,100.27,177.9,85.24,177.9,65.77Z"/>
  <path class="cls-1" d="M290.32,98.44,266.54,68.78V98.44H249.68V6.87l16.86-5.19V61.85L289,33.11h20.12L282.87,65.38l27.05,33.06Z"/>
  <path class="cls-1" d="M377.26,58.32V98.44H360.4v-38c0-8.89-5.35-13.46-12.93-13.46-8.23,0-14.38,4.83-14.38,16.2V98.44H316.24V33.11h16.85v7.31c3.92-5.88,10.72-9.14,19.47-9.14C366.41,31.28,377.26,41,377.26,58.32Z"/>
  <path class="cls-1" d="M454.72,33.11V98.44H437.87V90.73c-4.71,5.88-11.76,9.54-21.3,9.54-17.38,0-31.75-15-31.75-34.5s14.37-34.49,31.75-34.49c9.54,0,16.59,3.66,21.3,9.54V33.11ZM437.87,65.77c0-11-7.71-18.42-18.17-18.42s-18,7.45-18,18.42,7.71,18.43,18,18.43S437.87,76.75,437.87,65.77Z"/>
  <path class="cls-1" d="M498.65,49.31V33.11H483.88V13.9L467,19.09v57.4c0,17.64,8,24.56,31.63,22V83.15c-9.67.53-14.77.39-14.77-6.66V49.31Z"/><path class="cls-1" d="M510.46,33.11h16.85V98.44H510.46Z"/>
  <path class="cls-1" d="M603.13,33.11,578.3,98.44H559.09L534.27,33.11h18.55l15.81,45.73,15.94-45.73Z"/><path class="cls-1" d="M639.2,85c6.53,0,11.76-2.74,14.64-6.53l13.58,7.84c-6.14,8.88-15.94,14-28.48,14-22,0-35.8-15-35.8-34.5s14-34.49,34.49-34.49c19.34,0,33.06,15.29,33.06,34.49A39.11,39.11,0,0,1,670,72.7H620.78C623.13,81.32,630.32,85,639.2,85Zm14.64-25.35c-2.1-9.41-9.15-13.2-16.21-13.2-9,0-15.15,4.84-17.12,13.2Z"/>
</svg>
`;

/* src/views/connect/Sidebar.svelte generated by Svelte v3.48.0 */

function add_css$h(target) {
	append_styles(
		target,
		'svelte-kwt38y',
		'.sidebar.svelte-kwt38y{padding:var(--onboard-spacing-3, var(--spacing-3));background:var(\n      --onboard-connect-sidebar-background,\n      var(--onboard-gray-100, var(--gray-100))\n    );color:var(\n      --onboard-connect-sidebar-color,\n      var(--onboard-gray-700, var(--gray-700))\n    )}.inner-container.svelte-kwt38y{padding-left:var(--onboard-spacing-5, var(--spacing-5));max-width:236px}.icon-container.svelte-kwt38y{height:3rem;margin-bottom:var(--onboard-spacing-4, var(--spacing-4))}.heading.svelte-kwt38y{font-size:var(--onboard-font-size-3, var(--font-size-3));margin:0 0 var(--onboard-spacing-5, var(--spacing-5)) 0}.subheading.svelte-kwt38y{margin:0 0 var(--onboard-spacing-5, var(--spacing-5)) 0}.description.svelte-kwt38y{line-height:20px;font-size:var(--onboard-font-size-6, var(--font-size-6));margin:0}.indicators.svelte-kwt38y{margin-top:var(--onboard-spacing-2, var(--spacing-2))}.indicator.svelte-kwt38y{box-sizing:content-box;width:8px;height:8px;border-radius:8px;background:var(\n      --onboard-connect-sidebar-progress-background,\n      var(--onboard-gray-200, var(--gray-200))\n    );transition:background 250ms ease-in-out}.indicator.on.svelte-kwt38y{background:var(\n      --onboard-connect-sidebar-progress-color,\n      var(--onboard-primary-600, var(--primary-600))\n    );border:2px solid\n      var(\n        --onboard-connect-sidebar-progress-background,\n        var(--onboard-gray-200, var(--gray-200))\n      )}.join.svelte-kwt38y{box-sizing:content-box;z-index:1;right:4px;height:2px;background:var(\n      --onboard-connect-sidebar-progress-background,\n      var(--onboard-gray-200, var(--gray-200))\n    );transition:background 250ms ease-in-out}.join.active.svelte-kwt38y{background:var(\n      --onboard-connect-sidebar-progress-color,\n      var(--onboard-primary-600, var(--primary-600))\n    )}img.svelte-kwt38y{max-width:100%;height:auto}'
	);
}

// (114:6) {:else}
function create_else_block_1(ctx) {
	let html_tag;
	let html_anchor;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(blocknative, target, anchor);
			insert(target, html_anchor, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (108:6) {#if logo || icon}
function create_if_block_1$8(ctx) {
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (isSVG(/*logo*/ ctx[3] || /*icon*/ ctx[2])) return create_if_block_2$6;
		return create_else_block$4;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if_block.p(ctx, dirty);
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (111:8) {:else}
function create_else_block$4(ctx) {
	let img;
	let img_src_value;

	return {
		c() {
			img = element('img');
			if (!src_url_equal(img.src, (img_src_value = /*logo*/ ctx[3] || /*icon*/ ctx[2])))
				attr(img, 'src', img_src_value);
			attr(img, 'alt', 'logo');
			attr(img, 'class', 'svelte-kwt38y');
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(img);
		}
	};
}

// (109:8) {#if isSVG(logo || icon)}
function create_if_block_2$6(ctx) {
	let html_tag;
	let raw_value = /*logo*/ (ctx[3] || /*icon*/ ctx[2]) + '';
	let html_anchor;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(raw_value, target, anchor);
			insert(target, html_anchor, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (118:4) {#if $_(`connect.${step}.sidebar.heading`, { default: '' })}
function create_if_block$c(ctx) {
	let h2;
	let t_value =
		/*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.heading`, { default: /*heading*/ ctx[7] }) +
		'';
	let t;

	return {
		c() {
			h2 = element('h2');
			t = text(t_value);
			attr(h2, 'class', 'heading svelte-kwt38y');
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			append(h2, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_, step*/ 3 &&
				t_value !==
					(t_value =
						/*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.heading`, {
							default: /*heading*/ ctx[7]
						}) + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(h2);
		}
	};
}

function create_fragment$i(ctx) {
	let div8;
	let div7;
	let div0;
	let t0;
	let show_if = /*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.heading`, { default: '' });
	let t1;
	let h4;
	let t2_value =
		/*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.subheading`, {
			default: /*subheading*/ ctx[5]
		}) + '';
	let t2;
	let t3;
	let p;

	let t4_value =
		/*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.paragraph`, {
			values: { app: /*name*/ ctx[4] },
			default: /*paragraph*/ ctx[6]
		}) + '';

	let t4;
	let t5;
	let div6;
	let div1;
	let t6;
	let div2;
	let div2_style_value;
	let t7;
	let div3;
	let t8;
	let div4;
	let div4_style_value;
	let t9;
	let div5;

	function select_block_type(ctx, dirty) {
		if (/*logo*/ ctx[3] || /*icon*/ ctx[2]) return create_if_block_1$8;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = show_if && create_if_block$c(ctx);

	return {
		c() {
			div8 = element('div');
			div7 = element('div');
			div0 = element('div');
			if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			h4 = element('h4');
			t2 = text(t2_value);
			t3 = space();
			p = element('p');
			t4 = text(t4_value);
			t5 = space();
			div6 = element('div');
			div1 = element('div');
			t6 = space();
			div2 = element('div');
			t7 = space();
			div3 = element('div');
			t8 = space();
			div4 = element('div');
			t9 = space();
			div5 = element('div');
			attr(div0, 'class', 'icon-container flex svelte-kwt38y');
			attr(h4, 'class', 'subheading svelte-kwt38y');
			attr(p, 'class', 'description svelte-kwt38y');
			attr(div1, 'class', 'indicator relative svelte-kwt38y');
			toggle_class(div1, 'on', true);
			attr(div2, 'class', 'join relative svelte-kwt38y');

			attr(
				div2,
				'style',
				(div2_style_value = `${
					/*step*/ ctx[0] !== 'selectingWallet'
						? 'right: 4px; width: 52px;'
						: 'right: 2px; width: 54px;'
				}`)
			);

			toggle_class(div2, 'active', /*step*/ ctx[0] !== 'selectingWallet');
			attr(div3, 'class', 'indicator relative svelte-kwt38y');
			attr(div3, 'style', `right: 8px;`);
			toggle_class(div3, 'on', /*step*/ ctx[0] !== 'selectingWallet');
			attr(div4, 'class', 'join relative svelte-kwt38y');

			attr(
				div4,
				'style',
				(div4_style_value = `${
					/*step*/ ctx[0] === 'connectedWallet'
						? 'right: 12px; width: 52px;'
						: 'right: 10px; width: 54px;'
				}`)
			);

			toggle_class(div4, 'active', /*step*/ ctx[0] === 'connectedWallet');
			attr(div5, 'style', `right: 16px;`);
			attr(div5, 'class', 'indicator relative svelte-kwt38y');
			toggle_class(div5, 'on', /*step*/ ctx[0] === 'connectedWallet');
			attr(div6, 'class', 'indicators flex items-center svelte-kwt38y');
			attr(div7, 'class', 'inner-container svelte-kwt38y');
			attr(div8, 'class', 'sidebar svelte-kwt38y');
		},
		m(target, anchor) {
			insert(target, div8, anchor);
			append(div8, div7);
			append(div7, div0);
			if_block0.m(div0, null);
			append(div7, t0);
			if (if_block1) if_block1.m(div7, null);
			append(div7, t1);
			append(div7, h4);
			append(h4, t2);
			append(div7, t3);
			append(div7, p);
			append(p, t4);
			append(div7, t5);
			append(div7, div6);
			append(div6, div1);
			append(div6, t6);
			append(div6, div2);
			append(div6, t7);
			append(div6, div3);
			append(div6, t8);
			append(div6, div4);
			append(div6, t9);
			append(div6, div5);
		},
		p(ctx, [dirty]) {
			if_block0.p(ctx, dirty);
			if (dirty & /*$_, step*/ 3)
				show_if = /*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.heading`, { default: '' });

			if (show_if) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$c(ctx);
					if_block1.c();
					if_block1.m(div7, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (
				dirty & /*$_, step*/ 3 &&
				t2_value !==
					(t2_value =
						/*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.subheading`, {
							default: /*subheading*/ ctx[5]
						}) + '')
			)
				set_data(t2, t2_value);

			if (
				dirty & /*$_, step*/ 3 &&
				t4_value !==
					(t4_value =
						/*$_*/ ctx[1](`connect.${/*step*/ ctx[0]}.sidebar.paragraph`, {
							values: { app: /*name*/ ctx[4] },
							default: /*paragraph*/ ctx[6]
						}) + '')
			)
				set_data(t4, t4_value);

			if (
				dirty & /*step*/ 1 &&
				div2_style_value !==
					(div2_style_value = `${
						/*step*/ ctx[0] !== 'selectingWallet'
							? 'right: 4px; width: 52px;'
							: 'right: 2px; width: 54px;'
					}`)
			) {
				attr(div2, 'style', div2_style_value);
			}

			if (dirty & /*step*/ 1) {
				toggle_class(div2, 'active', /*step*/ ctx[0] !== 'selectingWallet');
			}

			if (dirty & /*step*/ 1) {
				toggle_class(div3, 'on', /*step*/ ctx[0] !== 'selectingWallet');
			}

			if (
				dirty & /*step*/ 1 &&
				div4_style_value !==
					(div4_style_value = `${
						/*step*/ ctx[0] === 'connectedWallet'
							? 'right: 12px; width: 52px;'
							: 'right: 10px; width: 54px;'
					}`)
			) {
				attr(div4, 'style', div4_style_value);
			}

			if (dirty & /*step*/ 1) {
				toggle_class(div4, 'active', /*step*/ ctx[0] === 'connectedWallet');
			}

			if (dirty & /*step*/ 1) {
				toggle_class(div5, 'on', /*step*/ ctx[0] === 'connectedWallet');
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div8);
			if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

function instance$i($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(1, ($_ = $$value)));
	let { step } = $$props;
	const { appMetadata } = configuration;
	const { icon, logo, name = 'This app' } = appMetadata || {};
	const defaultContent = en.connect[step].sidebar;
	const { subheading, paragraph } = defaultContent;
	const { heading } = defaultContent;

	$$self.$$set = ($$props) => {
		if ('step' in $$props) $$invalidate(0, (step = $$props.step));
	};

	return [step, $_, icon, logo, name, subheading, paragraph, heading];
}

class Sidebar extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, { step: 0 }, add_css$h);
	}
}

/* src/views/connect/Index.svelte generated by Svelte v3.48.0 */

function add_css$g(target) {
	append_styles(
		target,
		'svelte-ro440k',
		'.container.svelte-ro440k{font-family:var(--onboard-font-family-normal, var(--font-family-normal));line-height:24px;color:var(--onboard-gray-700, var(--gray-700));font-size:var(--onboard-font-size-5, var(--font-size-5));height:var(--onboard-connect-content-height, 440px);overflow:hidden;background:var(\n      --onboard-main-scroll-container-background,\n      var(--onboard-white, var(--white))\n    )}.content.svelte-ro440k{width:var(--onboard-connect-content-width, 488px)}.scroll-container.svelte-ro440k{overflow-y:auto;transition:opacity 250ms ease-in-out;scrollbar-width:none}.scroll-container.svelte-ro440k::-webkit-scrollbar{display:none}.header.svelte-ro440k{box-shadow:var(--onboard-shadow-2, var(--shadow-2));background:var(\n      --onboard-connect-header-background,\n      var(--onboard-white, var(--white))\n    );color:var(\n      --onboard-connect-header-color,\n      var(--onboard-black, var(--black))\n    );border-radius:0 24px 0 0}.header-heading.svelte-ro440k{margin:var(--onboard-spacing-4, var(--spacing-4));line-height:16px}.button-container.svelte-ro440k{right:var(--onboard-spacing-5, var(--spacing-5));top:var(--onboard-spacing-5, var(--spacing-5))}.disabled.svelte-ro440k{opacity:0.2;pointer-events:none}@media all and (max-width: 520px){.content.svelte-ro440k{width:100%}.container.svelte-ro440k{height:auto;min-height:228px}}'
	);
}

// (295:0) {#if !autoSelect.disableModals}
function create_if_block$b(ctx) {
	let modal;
	let current;

	modal = new Modal({
		props: {
			close: /*close*/ ctx[14],
			$$slots: { default: [create_default_slot$3] },
			$$scope: { ctx }
		}
	});

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const modal_changes = {};

			if (
				dirty &
				/*$$scope, scrollContainer, selectedWallet, $modalStep$, connectionRejected, agreed, wallets, connectingWalletLabel, connectingErrorMessage, $_, windowWidth*/ 268437502
			) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

// (298:6) {#if windowWidth >= 809}
function create_if_block_5$2(ctx) {
	let sidebar;
	let current;
	sidebar = new Sidebar({ props: { step: /*$modalStep$*/ ctx[9] } });

	return {
		c() {
			create_component(sidebar.$$.fragment);
		},
		m(target, anchor) {
			mount_component(sidebar, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const sidebar_changes = {};
			if (dirty & /*$modalStep$*/ 512) sidebar_changes.step = /*$modalStep$*/ ctx[9];
			sidebar.$set(sidebar_changes);
		},
		i(local) {
			if (current) return;
			transition_in(sidebar.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sidebar.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(sidebar, detaching);
		}
	};
}

// (319:10) {#if $modalStep$ === 'selectingWallet'}
function create_if_block_3$3(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_4$2, create_else_block$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*wallets*/ ctx[2].length) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] =
						if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (331:12) {:else}
function create_else_block$3(ctx) {
	let installwallet;
	let current;
	installwallet = new InstallWallet({});

	return {
		c() {
			create_component(installwallet.$$.fragment);
		},
		m(target, anchor) {
			mount_component(installwallet, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(installwallet.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(installwallet.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(installwallet, detaching);
		}
	};
}

// (320:12) {#if wallets.length}
function create_if_block_4$2(ctx) {
	let agreement;
	let updating_agreed;
	let t;
	let div;
	let selectingwallet;
	let current;

	function agreement_agreed_binding(value) {
		/*agreement_agreed_binding*/ ctx[18](value);
	}

	let agreement_props = {};

	if (/*agreed*/ ctx[4] !== void 0) {
		agreement_props.agreed = /*agreed*/ ctx[4];
	}

	agreement = new Agreement({ props: agreement_props });
	binding_callbacks.push(() => bind(agreement, 'agreed', agreement_agreed_binding));

	selectingwallet = new SelectingWallet({
		props: {
			selectWallet: /*selectWallet*/ ctx[12],
			wallets: /*wallets*/ ctx[2],
			connectingWalletLabel: /*connectingWalletLabel*/ ctx[5],
			connectingErrorMessage: /*connectingErrorMessage*/ ctx[6]
		}
	});

	return {
		c() {
			create_component(agreement.$$.fragment);
			t = space();
			div = element('div');
			create_component(selectingwallet.$$.fragment);
			attr(div, 'class', 'svelte-ro440k');
			toggle_class(div, 'disabled', !(/*agreed*/ ctx[4]));
		},
		m(target, anchor) {
			mount_component(agreement, target, anchor);
			insert(target, t, anchor);
			insert(target, div, anchor);
			mount_component(selectingwallet, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const agreement_changes = {};

			if (!updating_agreed && dirty & /*agreed*/ 16) {
				updating_agreed = true;
				agreement_changes.agreed = /*agreed*/ ctx[4];
				add_flush_callback(() => (updating_agreed = false));
			}

			agreement.$set(agreement_changes);
			const selectingwallet_changes = {};
			if (dirty & /*wallets*/ 4) selectingwallet_changes.wallets = /*wallets*/ ctx[2];
			if (dirty & /*connectingWalletLabel*/ 32)
				selectingwallet_changes.connectingWalletLabel = /*connectingWalletLabel*/ ctx[5];
			if (dirty & /*connectingErrorMessage*/ 64)
				selectingwallet_changes.connectingErrorMessage = /*connectingErrorMessage*/ ctx[6];
			selectingwallet.$set(selectingwallet_changes);

			if (dirty & /*agreed*/ 16) {
				toggle_class(div, 'disabled', !(/*agreed*/ ctx[4]));
			}
		},
		i(local) {
			if (current) return;
			transition_in(agreement.$$.fragment, local);
			transition_in(selectingwallet.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(agreement.$$.fragment, local);
			transition_out(selectingwallet.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(agreement, detaching);
			if (detaching) detach(t);
			if (detaching) detach(div);
			destroy_component(selectingwallet);
		}
	};
}

// (336:10) {#if $modalStep$ === 'connectingWallet' && selectedWallet}
function create_if_block_2$5(ctx) {
	let connectingwallet;
	let current;

	connectingwallet = new ConnectingWallet({
		props: {
			connectWallet: /*connectWallet*/ ctx[15],
			connectionRejected: /*connectionRejected*/ ctx[1],
			setStep: /*setStep*/ ctx[16],
			deselectWallet: /*deselectWallet*/ ctx[13],
			selectedWallet: /*selectedWallet*/ ctx[3]
		}
	});

	return {
		c() {
			create_component(connectingwallet.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connectingwallet, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const connectingwallet_changes = {};
			if (dirty & /*connectionRejected*/ 2)
				connectingwallet_changes.connectionRejected = /*connectionRejected*/ ctx[1];
			if (dirty & /*selectedWallet*/ 8)
				connectingwallet_changes.selectedWallet = /*selectedWallet*/ ctx[3];
			connectingwallet.$set(connectingwallet_changes);
		},
		i(local) {
			if (current) return;
			transition_in(connectingwallet.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connectingwallet.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connectingwallet, detaching);
		}
	};
}

// (346:10) {#if $modalStep$ === 'connectedWallet' && selectedWallet}
function create_if_block_1$7(ctx) {
	let connectedwallet;
	let current;

	connectedwallet = new ConnectedWallet({
		props: {
			selectedWallet: /*selectedWallet*/ ctx[3]
		}
	});

	return {
		c() {
			create_component(connectedwallet.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connectedwallet, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const connectedwallet_changes = {};
			if (dirty & /*selectedWallet*/ 8)
				connectedwallet_changes.selectedWallet = /*selectedWallet*/ ctx[3];
			connectedwallet.$set(connectedwallet_changes);
		},
		i(local) {
			if (current) return;
			transition_in(connectedwallet.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connectedwallet.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connectedwallet, detaching);
		}
	};
}

// (296:2) <Modal {close}>
function create_default_slot$3(ctx) {
	let div4;
	let t0;
	let div3;
	let div1;
	let h4;

	let t1_value =
		/*$_*/ ctx[10](`connect.${/*$modalStep$*/ ctx[9]}.header`, {
			default: en.connect[/*$modalStep$*/ ctx[9]].header,
			values: {
				connectionRejected: /*connectionRejected*/ ctx[1],
				wallet: /*selectedWallet*/ ctx[3] && /*selectedWallet*/ ctx[3].label
			}
		}) + '';

	let t1;
	let t2;
	let div0;
	let closebutton;
	let t3;
	let div2;
	let t4;
	let t5;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*windowWidth*/ ctx[7] >= 809 && create_if_block_5$2(ctx);
	closebutton = new CloseButton({});
	let if_block1 = /*$modalStep$*/ ctx[9] === 'selectingWallet' && create_if_block_3$3(ctx);
	let if_block2 =
		/*$modalStep$*/ ctx[9] === 'connectingWallet' &&
		/*selectedWallet*/ ctx[3] &&
		create_if_block_2$5(ctx);
	let if_block3 =
		/*$modalStep$*/ ctx[9] === 'connectedWallet' &&
		/*selectedWallet*/ ctx[3] &&
		create_if_block_1$7(ctx);

	return {
		c() {
			div4 = element('div');
			if (if_block0) if_block0.c();
			t0 = space();
			div3 = element('div');
			div1 = element('div');
			h4 = element('h4');
			t1 = text(t1_value);
			t2 = space();
			div0 = element('div');
			create_component(closebutton.$$.fragment);
			t3 = space();
			div2 = element('div');
			if (if_block1) if_block1.c();
			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			if (if_block3) if_block3.c();
			attr(h4, 'class', 'header-heading svelte-ro440k');
			attr(div0, 'class', 'button-container absolute svelte-ro440k');
			attr(div1, 'class', 'header relative flex items-center svelte-ro440k');
			attr(div2, 'class', 'scroll-container svelte-ro440k');
			attr(div3, 'class', 'content flex flex-column svelte-ro440k');
			attr(div4, 'class', 'container relative flex svelte-ro440k');
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			if (if_block0) if_block0.m(div4, null);
			append(div4, t0);
			append(div4, div3);
			append(div3, div1);
			append(div1, h4);
			append(h4, t1);
			append(div1, t2);
			append(div1, div0);
			mount_component(closebutton, div0, null);
			append(div3, t3);
			append(div3, div2);
			if (if_block1) if_block1.m(div2, null);
			append(div2, t4);
			if (if_block2) if_block2.m(div2, null);
			append(div2, t5);
			if (if_block3) if_block3.m(div2, null);
			/*div2_binding*/ ctx[19](div2);
			current = true;

			if (!mounted) {
				dispose = listen(div0, 'click', /*close*/ ctx[14]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*windowWidth*/ ctx[7] >= 809) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*windowWidth*/ 128) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div4, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (
				(!current || dirty & /*$_, $modalStep$, connectionRejected, selectedWallet*/ 1546) &&
				t1_value !==
					(t1_value =
						/*$_*/ ctx[10](`connect.${/*$modalStep$*/ ctx[9]}.header`, {
							default: en.connect[/*$modalStep$*/ ctx[9]].header,
							values: {
								connectionRejected: /*connectionRejected*/ ctx[1],
								wallet: /*selectedWallet*/ ctx[3] && /*selectedWallet*/ ctx[3].label
							}
						}) + '')
			)
				set_data(t1, t1_value);

			if (/*$modalStep$*/ ctx[9] === 'selectingWallet') {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*$modalStep$*/ 512) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_3$3(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div2, t4);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*$modalStep$*/ ctx[9] === 'connectingWallet' && /*selectedWallet*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*$modalStep$, selectedWallet*/ 520) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_2$5(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div2, t5);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*$modalStep$*/ ctx[9] === 'connectedWallet' && /*selectedWallet*/ ctx[3]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*$modalStep$, selectedWallet*/ 520) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_1$7(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div2, null);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(closebutton.$$.fragment, local);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(if_block3);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(closebutton.$$.fragment, local);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(if_block3);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div4);
			if (if_block0) if_block0.d();
			destroy_component(closebutton);
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			/*div2_binding*/ ctx[19](null);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$h(ctx) {
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;
	add_render_callback(/*onwindowresize*/ ctx[17]);
	let if_block = !(/*autoSelect*/ ctx[0].disableModals) && create_if_block$b(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen(window, 'resize', /*onwindowresize*/ ctx[17]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!(/*autoSelect*/ ctx[0].disableModals)) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*autoSelect*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$b(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
			mounted = false;
			dispose();
		}
	};
}

function instance$h($$self, $$props, $$invalidate) {
	let $modalStep$;
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(10, ($_ = $$value)));
	let { autoSelect } = $$props;
	const { appMetadata } = configuration;
	const { walletModules } = state.get();
	let connectionRejected = false;
	let wallets = [];
	let selectedWallet;
	let agreed;
	let connectingWalletLabel;
	let connectingErrorMessage;
	let windowWidth;
	let scrollContainer;
	let walletToAutoSelect =
		autoSelect.label &&
		walletModules.find(({ label }) => label.toLowerCase() === autoSelect.label.toLowerCase());
	const modalStep$ = new BehaviorSubject('selectingWallet');
	component_subscribe($$self, modalStep$, (value) => $$invalidate(9, ($modalStep$ = value)));

	// ==== SELECT WALLET ==== //
	async function selectWallet({ label, icon, getInterface }) {
		$$invalidate(5, (connectingWalletLabel = label));

		try {
			const existingWallet = state.get().wallets.find((wallet) => wallet.label === label);

			if (existingWallet) {
				// set as first wallet
				addWallet(existingWallet);

				try {
					await selectAccounts(existingWallet.provider);

					// change step on next event loop
					setTimeout(() => setStep('connectedWallet'), 1);
				} catch (error) {
					const { code } = error;

					if (
						code === ProviderRpcErrorCode.UNSUPPORTED_METHOD ||
						code === ProviderRpcErrorCode.DOES_NOT_EXIST
					) {
						connectWallet$.next({
							inProgress: false,
							actionRequired: existingWallet.label
						});
					}
				}

				$$invalidate(3, (selectedWallet = existingWallet));
				return;
			}

			const { chains } = state.get();

			const { provider, instance } = await getInterface({
				chains,
				BigNumber: BigNumber$1,
				EventEmitter,
				appMetadata
			});

			const loadedIcon = await icon;

			$$invalidate(
				3,
				(selectedWallet = {
					label,
					icon: loadedIcon,
					provider,
					instance,
					accounts: [],
					chains: [{ namespace: 'evm', id: '0x1' }]
				})
			);

			$$invalidate(6, (connectingErrorMessage = ''));

			// change step on next event loop
			setTimeout(() => setStep('connectingWallet'), 1);
		} catch (error) {
			const { message } = error;
			$$invalidate(6, (connectingErrorMessage = message));
			scrollToTop();
		} finally {
			$$invalidate(5, (connectingWalletLabel = ''));
		}
	}

	function deselectWallet() {
		$$invalidate(3, (selectedWallet = null));
	}

	function updateSelectedWallet(update) {
		$$invalidate(3, (selectedWallet = { ...selectedWallet, ...update }));
	}

	async function autoSelectWallet(wallet) {
		const { getIcon, getInterface, label } = wallet;
		const icon = getIcon();
		selectWallet({ label, icon, getInterface });
	}

	async function loadWalletsForSelection() {
		$$invalidate(
			2,
			(wallets = walletModules.map(({ getIcon, getInterface, label }) => {
				return { label, icon: getIcon(), getInterface };
			}))
		);
	}

	function close() {
		connectWallet$.next({ inProgress: false });
	}

	// ==== CONNECT WALLET ==== //
	async function connectWallet() {
		$$invalidate(1, (connectionRejected = false));
		const { provider, label } = selectedWallet;

		try {
			const [address] = await requestAccounts(provider);

			// canceled previous request
			if (!address) {
				return;
			}

			const chain = await getChainId(provider);

			if (state.get().notify.enabled) {
				const sdk = await getBlocknativeSdk();

				if (sdk) {
					try {
						sdk.subscribe({
							id: address,
							chainId: chain,
							type: 'account'
						});
					} catch (error) {} // unsupported network for transaction events
				}
			}

			const update = {
				accounts: [{ address, ens: null, balance: null }],
				chains: [{ namespace: 'evm', id: chain }]
			};

			addWallet({ ...selectedWallet, ...update });
			trackWallet(provider, label);
			updateSelectedWallet(update);
			setStep('connectedWallet');
		} catch (error) {
			const { code } = error;

			// user rejected account access
			if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED) {
				$$invalidate(1, (connectionRejected = true));

				if (walletToAutoSelect) {
					walletToAutoSelect = null;

					if (autoSelect.disableModals) {
						connectWallet$.next({ inProgress: false });
					}
				}

				return;
			}

			// account access has already been requested and is awaiting approval
			if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_ALREADY_REQUESTED) {
				return;
			}
		}
	}

	// ==== CONNECTED WALLET ==== //
	async function updateAccountDetails() {
		const { accounts, chains: selectedWalletChains } = selectedWallet;
		const appChains = state.get().chains;
		const [connectedWalletChain] = selectedWalletChains;
		const appChain = appChains.find(
			({ namespace, id }) =>
				namespace === connectedWalletChain.namespace && id === connectedWalletChain.id
		);
		const { address } = accounts[0];
		let { balance, ens } = accounts[0];

		if (balance === null) {
			getBalance(address, appChain).then((balance) => {
				updateAccount(selectedWallet.label, address, { balance });
			});
		}

		if (ens === null && validEnsChain(connectedWalletChain.id)) {
			getEns(address, appChain).then((ens) => {
				updateAccount(selectedWallet.label, address, { ens });
			});
		}

		setTimeout(() => connectWallet$.next({ inProgress: false }), 1500);
	}

	modalStep$.pipe(takeUntil$1(onDestroy$)).subscribe((step) => {
		switch (step) {
			case 'selectingWallet': {
				if (walletToAutoSelect) {
					autoSelectWallet(walletToAutoSelect);
				} else {
					loadWalletsForSelection();
				}

				break;
			}
			case 'connectingWallet': {
				connectWallet();
				break;
			}
			case 'connectedWallet': {
				updateAccountDetails();
				break;
			}
		}
	});

	function setStep(update) {
		modalStep$.next(update);
	}

	function scrollToTop() {
		scrollContainer && scrollContainer.scrollTo(0, 0);
	}

	function onwindowresize() {
		$$invalidate(7, (windowWidth = window.innerWidth));
	}

	function agreement_agreed_binding(value) {
		agreed = value;
		$$invalidate(4, agreed);
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			scrollContainer = $$value;
			$$invalidate(8, scrollContainer);
		});
	}

	$$self.$$set = ($$props) => {
		if ('autoSelect' in $$props) $$invalidate(0, (autoSelect = $$props.autoSelect));
	};

	return [
		autoSelect,
		connectionRejected,
		wallets,
		selectedWallet,
		agreed,
		connectingWalletLabel,
		connectingErrorMessage,
		windowWidth,
		scrollContainer,
		$modalStep$,
		$_,
		modalStep$,
		selectWallet,
		deselectWallet,
		close,
		connectWallet,
		setStep,
		onwindowresize,
		agreement_agreed_binding,
		div2_binding
	];
}

class Index$3 extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$h,
			create_fragment$h,
			safe_not_equal,
			{ autoSelect: 0 },
			add_css$g
		);
	}
}

/* src/views/chain/SwitchChain.svelte generated by Svelte v3.48.0 */

function add_css$f(target) {
	append_styles(
		target,
		'svelte-12yam41',
		'.container.svelte-12yam41{padding:var(--onboard-spacing-4, var(--spacing-4));font-family:var(--onboard-font-family-normal, var(--font-family-normal));line-height:16px;font-size:var(--onboard-font-size-5, var(--font-size-5))}.close.svelte-12yam41{top:var(--onboard-spacing-5, var(--spacing-5));right:var(--onboard-spacing-5, var(--spacing-5));padding:0.5rem}h4.svelte-12yam41{font-size:var(--onboard-font-size-3, var(--font-size-3));margin:var(--onboard-spacing-4, var(--spacing-4)) 0}p.svelte-12yam41{margin:0 0 var(--onboard-spacing-4, var(--spacing-4)) 0;max-width:488px}'
	);
}

// (42:0) <Modal {close}>
function create_default_slot$2(ctx) {
	let div1;
	let h4;
	let t0_value =
		/*$_*/ ctx[0]('modals.switchChain.heading', { default: en.modals.switchChain.heading }) + '';
	let t0;
	let t1;
	let p0;

	let t2_value =
		/*$_*/ ctx[0]('modals.switchChain.paragraph1', {
			default: en.modals.switchChain.paragraph1,
			values: {
				app: /*appMetadata*/ (ctx[1] && /*appMetadata*/ ctx[1].name) || 'This app',
				nextNetworkName: /*nextNetworkName*/ ctx[2]
			}
		}) + '';

	let t2;
	let t3;
	let p1;

	let t4_value =
		/*$_*/ ctx[0]('modals.switchChain.paragraph2', {
			default: en.modals.switchChain.paragraph2
		}) + '';

	let t4;
	let t5;
	let div0;
	let closebutton;
	let current;
	let mounted;
	let dispose;
	closebutton = new CloseButton({});

	return {
		c() {
			div1 = element('div');
			h4 = element('h4');
			t0 = text(t0_value);
			t1 = space();
			p0 = element('p');
			t2 = text(t2_value);
			t3 = space();
			p1 = element('p');
			t4 = text(t4_value);
			t5 = space();
			div0 = element('div');
			create_component(closebutton.$$.fragment);
			attr(h4, 'class', 'svelte-12yam41');
			attr(p0, 'class', 'svelte-12yam41');
			attr(p1, 'class', 'svelte-12yam41');
			attr(div0, 'class', 'close absolute svelte-12yam41');
			attr(div1, 'class', 'container relative svelte-12yam41');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, h4);
			append(h4, t0);
			append(div1, t1);
			append(div1, p0);
			append(p0, t2);
			append(div1, t3);
			append(div1, p1);
			append(p1, t4);
			append(div1, t5);
			append(div1, div0);
			mount_component(closebutton, div0, null);
			current = true;

			if (!mounted) {
				dispose = listen(div0, 'click', /*close*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (
				(!current || dirty & /*$_*/ 1) &&
				t0_value !==
					(t0_value =
						/*$_*/ ctx[0]('modals.switchChain.heading', {
							default: en.modals.switchChain.heading
						}) + '')
			)
				set_data(t0, t0_value);

			if (
				(!current || dirty & /*$_*/ 1) &&
				t2_value !==
					(t2_value =
						/*$_*/ ctx[0]('modals.switchChain.paragraph1', {
							default: en.modals.switchChain.paragraph1,
							values: {
								app: /*appMetadata*/ (ctx[1] && /*appMetadata*/ ctx[1].name) || 'This app',
								nextNetworkName: /*nextNetworkName*/ ctx[2]
							}
						}) + '')
			)
				set_data(t2, t2_value);

			if (
				(!current || dirty & /*$_*/ 1) &&
				t4_value !==
					(t4_value =
						/*$_*/ ctx[0]('modals.switchChain.paragraph2', {
							default: en.modals.switchChain.paragraph2
						}) + '')
			)
				set_data(t4, t4_value);
		},
		i(local) {
			if (current) return;
			transition_in(closebutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(closebutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(closebutton);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$g(ctx) {
	let modal;
	let current;

	modal = new Modal({
		props: {
			close: /*close*/ ctx[3],
			$$slots: { default: [create_default_slot$2] },
			$$scope: { ctx }
		}
	});

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope, $_*/ 33) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

function instance$g($$self, $$props, $$invalidate) {
	let $switchChainModal$;
	let $_;
	component_subscribe($$self, switchChainModal$, ($$value) =>
		$$invalidate(4, ($switchChainModal$ = $$value))
	);
	component_subscribe($$self, _, ($$value) => $$invalidate(0, ($_ = $$value)));
	const { appMetadata } = configuration;
	const nextNetworkName = $switchChainModal$.chain.label;

	function close() {
		switchChainModal$.next(null);
	}

	return [$_, appMetadata, nextNetworkName, close];
}

class SwitchChain extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, {}, add_css$f);
	}
}

/* src/views/shared/InfoIcon.svelte generated by Svelte v3.48.0 */

function add_css$e(target) {
	append_styles(
		target,
		'svelte-z54y2j',
		'.icon.svelte-z54y2j{border-radius:50px;color:var(--onboard-primary-500, var(--primary-500))}'
	);
}

function create_fragment$f(ctx) {
	let div;
	let div_style_value;

	return {
		c() {
			div = element('div');
			attr(div, 'class', 'icon flex svelte-z54y2j');
			attr(
				div,
				'style',
				(div_style_value = `width: ${/*size*/ ctx[0]}px; height: ${/*size*/ ctx[0]}px;`)
			);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div.innerHTML = infoIcon;
		},
		p(ctx, [dirty]) {
			if (
				dirty & /*size*/ 1 &&
				div_style_value !==
					(div_style_value = `width: ${/*size*/ ctx[0]}px; height: ${/*size*/ ctx[0]}px;`)
			) {
				attr(div, 'style', div_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$f($$self, $$props, $$invalidate) {
	let { size = 20 } = $$props;

	$$self.$$set = ($$props) => {
		if ('size' in $$props) $$invalidate(0, (size = $$props.size));
	};

	return [size];
}

class InfoIcon extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, { size: 0 }, add_css$e);
	}
}

/* src/views/connect/ActionRequired.svelte generated by Svelte v3.48.0 */

function add_css$d(target) {
	append_styles(
		target,
		'svelte-1sfp8g8',
		'.content.svelte-1sfp8g8{padding:1rem;width:300px;font-family:var(--onboard-font-family-normal, var(--font-family-normal));font-size:var(--onboard-font-size-5, var(--font-size-5));line-height:24px;background:var(\n      --onboard-action-required-modal-background,\n      var(--onboard-white, var(--white))\n    )}.icon-container.svelte-1sfp8g8{width:3rem;height:3rem;background:var(--onboard-primary-100, var(--primary-100));border-radius:24px}h4.svelte-1sfp8g8{margin:1.5rem 0 0.5rem 0;font-weight:700}p.svelte-1sfp8g8{margin:0;font-weight:400}a.svelte-1sfp8g8{font-weight:700}button.svelte-1sfp8g8{margin-top:1.5rem;font-weight:700}'
	);
}

// (62:6) {#if wallet === 'MetaMask'}
function create_if_block$a(ctx) {
	let a;
	let t_value = /*$_*/ ctx[1]('modals.actionRequired.linkText') + '';
	let t;

	return {
		c() {
			a = element('a');
			t = text(t_value);
			attr(
				a,
				'href',
				'https://metamask.zendesk.com/hc/en-us/articles/360061346311-Switching-accounts-in-MetaMask'
			);
			attr(a, 'target', '_blank');
			attr(a, 'rel', 'noreferrer noopener');
			attr(a, 'class', 'svelte-1sfp8g8');
		},
		m(target, anchor) {
			insert(target, a, anchor);
			append(a, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 2 &&
				t_value !== (t_value = /*$_*/ ctx[1]('modals.actionRequired.linkText') + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(a);
		}
	};
}

// (51:0) <Modal {close}>
function create_default_slot$1(ctx) {
	let div1;
	let div0;
	let infoicon;
	let t0;
	let h4;
	let t1_value =
		/*$_*/ ctx[1]('modals.actionRequired.heading', { values: { wallet: /*wallet*/ ctx[0] } }) + '';
	let t1;
	let t2;
	let p;
	let t3_value = /*$_*/ ctx[1]('modals.actionRequired.paragraph') + '';
	let t3;
	let t4;
	let t5;
	let button;
	let t6_value = /*$_*/ ctx[1]('modals.actionRequired.buttonText') + '';
	let t6;
	let current;
	let mounted;
	let dispose;
	infoicon = new InfoIcon({});
	let if_block = /*wallet*/ ctx[0] === 'MetaMask' && create_if_block$a(ctx);

	return {
		c() {
			div1 = element('div');
			div0 = element('div');
			create_component(infoicon.$$.fragment);
			t0 = space();
			h4 = element('h4');
			t1 = text(t1_value);
			t2 = space();
			p = element('p');
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			t5 = space();
			button = element('button');
			t6 = text(t6_value);
			attr(div0, 'class', 'icon-container flex justify-center items-center svelte-1sfp8g8');
			attr(h4, 'class', 'svelte-1sfp8g8');
			attr(p, 'class', 'svelte-1sfp8g8');
			attr(button, 'class', 'button-neutral-solid rounded svelte-1sfp8g8');
			attr(div1, 'class', 'content svelte-1sfp8g8');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			mount_component(infoicon, div0, null);
			append(div1, t0);
			append(div1, h4);
			append(h4, t1);
			append(div1, t2);
			append(div1, p);
			append(p, t3);
			append(p, t4);
			if (if_block) if_block.m(p, null);
			append(div1, t5);
			append(div1, button);
			append(button, t6);
			current = true;

			if (!mounted) {
				dispose = listen(button, 'click', /*close*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (
				(!current || dirty & /*$_, wallet*/ 3) &&
				t1_value !==
					(t1_value =
						/*$_*/ ctx[1]('modals.actionRequired.heading', {
							values: { wallet: /*wallet*/ ctx[0] }
						}) + '')
			)
				set_data(t1, t1_value);
			if (
				(!current || dirty & /*$_*/ 2) &&
				t3_value !== (t3_value = /*$_*/ ctx[1]('modals.actionRequired.paragraph') + '')
			)
				set_data(t3, t3_value);

			if (/*wallet*/ ctx[0] === 'MetaMask') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$a(ctx);
					if_block.c();
					if_block.m(p, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (
				(!current || dirty & /*$_*/ 2) &&
				t6_value !== (t6_value = /*$_*/ ctx[1]('modals.actionRequired.buttonText') + '')
			)
				set_data(t6, t6_value);
		},
		i(local) {
			if (current) return;
			transition_in(infoicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(infoicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(infoicon);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$e(ctx) {
	let modal;
	let current;

	modal = new Modal({
		props: {
			close: /*close*/ ctx[2],
			$$slots: { default: [create_default_slot$1] },
			$$scope: { ctx }
		}
	});

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope, $_, wallet*/ 11) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(1, ($_ = $$value)));
	let { wallet } = $$props;

	function close() {
		connectWallet$.next({ inProgress: false, actionRequired: '' });
	}

	$$self.$$set = ($$props) => {
		if ('wallet' in $$props) $$invalidate(0, (wallet = $$props.wallet));
	};

	return [wallet, $_, close];
}

class ActionRequired extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, { wallet: 0 }, add_css$d);
	}
}

var elipsisIcon = `
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
  </svg>
`;

/* src/views/account-center/WalletRow.svelte generated by Svelte v3.48.0 */

function add_css$c(target) {
	append_styles(
		target,
		'svelte-1x8e8c2',
		'.container.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{padding:0.25rem;margin-bottom:0.25rem;width:100%;font-size:var(--onboard-font-size-5, var(--font-size-5));line-height:var(--onboard-font-line-height-2, var(--font-line-height-2));border-radius:12px;transition:background-color 150ms ease-in-out}.container.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2:hover{background:var(--onboard-gray-500, var(--gray-500))}.container.svelte-1x8e8c2:hover>div.svelte-1x8e8c2>span.balance.svelte-1x8e8c2{color:var(--onboard-gray-100, var(--gray-100))}.container.primary.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2:hover{background:var(--onboard-gray-700, var(--gray-700))}.address-ens.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{margin-left:0.5rem;font-weight:700;color:var(--onboard-primary-100, var(--primary-100))}.balance.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{margin-left:0.5rem;color:var(--onboard-gray-300, var(--gray-300));transition:color 150ms ease-in-out, background-color 150ms ease-in-out}.elipsis-container.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{padding:0.25rem;margin-left:0.5rem;border-radius:24px;transition:color 150ms ease-in-out, background-color 150ms ease-in-out;background-color:transparent;color:var(--onboard-gray-400, var(--gray-400))}.elipsis.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{width:24px}.elipsis-container.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2:hover{color:var(--onboard-gray-100, var(--gray-100))}.elipsis-container.active.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{background:var(--onboard-gray-700, var(--gray-700))}.menu.svelte-1x8e8c2.svelte-1x8e8c2.svelte-1x8e8c2{background:var(--onboard-white, var(--white));border:1px solid var(--onboard-gray-100, var(--gray-100));border-radius:8px;list-style-type:none;right:0.25rem;top:2.25rem;margin:0;padding:0;border:none;overflow:hidden;z-index:1}.menu.svelte-1x8e8c2 li.svelte-1x8e8c2.svelte-1x8e8c2{color:var(--onboard-primary-500, var(--primary-500));font-size:var(--onboard-font-size-5, var(--font-size-5));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));padding:12px 16px;background:var(--onboard-white, var(--white));transition:background-color 150ms ease-in-out;cursor:pointer}.menu.svelte-1x8e8c2 li.svelte-1x8e8c2.svelte-1x8e8c2:hover{background:var(--onboard-primary-200, var(--primary-200))}'
	);
}

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i].address;
	child_ctx[13] = list[i].ens;
	child_ctx[14] = list[i].balance;
	child_ctx[16] = i;
	return child_ctx;
}

// (153:10) {#if primary && i === 0}
function create_if_block_3$2(ctx) {
	let div;
	let successstatusicon;
	let current;
	successstatusicon = new SuccessStatusIcon({ props: { size: 14 } });

	return {
		c() {
			div = element('div');
			create_component(successstatusicon.$$.fragment);
			set_style(div, 'right', '-5px');
			set_style(div, 'bottom', '-5px');
			attr(div, 'class', 'drop-shadow absolute');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(successstatusicon, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(successstatusicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(successstatusicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(successstatusicon);
		}
	};
}

// (171:8) {#if balance}
function create_if_block_2$4(ctx) {
	let span;
	let t_value = formatBalance(/*balance*/ ctx[14]) + '';
	let t;
	let span_intro;

	return {
		c() {
			span = element('span');
			t = text(t_value);
			attr(span, 'class', 'balance svelte-1x8e8c2');
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*wallet*/ 1 && t_value !== (t_value = formatBalance(/*balance*/ ctx[14]) + ''))
				set_data(t, t_value);
		},
		i(local) {
			if (!span_intro) {
				add_render_callback(() => {
					span_intro = create_in_transition(span, fade, {});
					span_intro.start();
				});
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (188:4) {#if showMenu === address}
function create_if_block$9(ctx) {
	let ul;
	let li0;
	let t0_value =
		/*$_*/ ctx[3]('accountCenter.addAccount', { default: en.accountCenter.addAccount }) + '';
	let t0;
	let t1;
	let t2;
	let li1;

	let t3_value =
		/*$_*/ ctx[3]('accountCenter.disconnectWallet', {
			default: en.accountCenter.disconnectWallet
		}) + '';

	let t3;
	let ul_intro;
	let mounted;
	let dispose;
	let if_block = !(/*primary*/ (ctx[1] && /*i*/ ctx[16] === 0)) && create_if_block_1$6(ctx);

	return {
		c() {
			ul = element('ul');
			li0 = element('li');
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			li1 = element('li');
			t3 = text(t3_value);
			attr(li0, 'class', 'svelte-1x8e8c2');
			attr(li1, 'class', 'svelte-1x8e8c2');
			attr(ul, 'class', 'menu absolute svelte-1x8e8c2');
		},
		m(target, anchor) {
			insert(target, ul, anchor);
			append(ul, li0);
			append(li0, t0);
			append(ul, t1);
			if (if_block) if_block.m(ul, null);
			append(ul, t2);
			append(ul, li1);
			append(li1, t3);

			if (!mounted) {
				dispose = [
					listen(li0, 'click', stop_propagation(/*click_handler_2*/ ctx[9])),
					listen(li1, 'click', stop_propagation(/*click_handler_4*/ ctx[11]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 8 &&
				t0_value !==
					(t0_value =
						/*$_*/ ctx[3]('accountCenter.addAccount', { default: en.accountCenter.addAccount }) +
						'')
			)
				set_data(t0, t0_value);

			if (!(/*primary*/ (ctx[1] && /*i*/ ctx[16] === 0))) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$6(ctx);
					if_block.c();
					if_block.m(ul, t2);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (
				dirty & /*$_*/ 8 &&
				t3_value !==
					(t3_value =
						/*$_*/ ctx[3]('accountCenter.disconnectWallet', {
							default: en.accountCenter.disconnectWallet
						}) + '')
			)
				set_data(t3, t3_value);
		},
		i(local) {
			if (!ul_intro) {
				add_render_callback(() => {
					ul_intro = create_in_transition(ul, fade, {});
					ul_intro.start();
				});
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(ul);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (200:8) {#if !(primary && i === 0)}
function create_if_block_1$6(ctx) {
	let li;

	let t_value =
		/*$_*/ ctx[3]('accountCenter.setPrimaryAccount', {
			default: en.accountCenter.setPrimaryAccount
		}) + '';

	let t;
	let mounted;
	let dispose;

	function click_handler_3() {
		return /*click_handler_3*/ ctx[10](/*address*/ ctx[12], /*ens*/ ctx[13], /*balance*/ ctx[14]);
	}

	return {
		c() {
			li = element('li');
			t = text(t_value);
			attr(li, 'class', 'svelte-1x8e8c2');
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, t);

			if (!mounted) {
				dispose = listen(li, 'click', stop_propagation(click_handler_3));
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (
				dirty & /*$_*/ 8 &&
				t_value !==
					(t_value =
						/*$_*/ ctx[3]('accountCenter.setPrimaryAccount', {
							default: en.accountCenter.setPrimaryAccount
						}) + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			dispose();
		}
	};
}

// (131:0) {#each wallet.accounts as { address, ens, balance }
function create_each_block$3(ctx) {
	let div6;
	let div5;
	let div1;
	let div0;
	let walletappbadge;
	let t0;
	let t1;
	let span;

	let t2_value =
		/*ens*/ (ctx[13] ? shortenEns(/*ens*/ ctx[13].name) : shortenAddress(/*address*/ ctx[12])) + '';

	let t2;
	let t3;
	let div4;
	let t4;
	let div3;
	let div2;
	let t5;
	let t6;
	let current;
	let mounted;
	let dispose;

	walletappbadge = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'custom',
			color: '#EFF1FC',
			customBackgroundColor:
				/*primary*/ ctx[1] && /*i*/ ctx[16] === 0
					? 'rgba(24, 206, 102, 0.2)'
					: 'rgba(235, 235, 237, 0.1)',
			border: /*primary*/ ctx[1] && /*i*/ ctx[16] === 0 ? 'green' : 'gray',
			radius: 8,
			icon: /*wallet*/ ctx[0].icon
		}
	});

	let if_block0 = /*primary*/ ctx[1] && /*i*/ ctx[16] === 0 && create_if_block_3$2();
	let if_block1 = /*balance*/ ctx[14] && create_if_block_2$4(ctx);

	function click_handler() {
		return /*click_handler*/ ctx[7](/*address*/ ctx[12]);
	}

	function click_handler_1() {
		return /*click_handler_1*/ ctx[8](/*address*/ ctx[12], /*ens*/ ctx[13], /*balance*/ ctx[14]);
	}

	let if_block2 = /*showMenu*/ ctx[2] === /*address*/ ctx[12] && create_if_block$9(ctx);

	return {
		c() {
			div6 = element('div');
			div5 = element('div');
			div1 = element('div');
			div0 = element('div');
			create_component(walletappbadge.$$.fragment);
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			span = element('span');
			t2 = text(t2_value);
			t3 = space();
			div4 = element('div');
			if (if_block1) if_block1.c();
			t4 = space();
			div3 = element('div');
			div2 = element('div');
			t5 = space();
			if (if_block2) if_block2.c();
			t6 = space();
			attr(div0, 'class', 'flex items-center relative');
			attr(span, 'class', 'address-ens svelte-1x8e8c2');
			attr(div1, 'class', 'flex items-center');
			attr(
				div2,
				'class',
				'elipsis pointer flex items-center justify-center relative svelte-1x8e8c2'
			);
			attr(div3, 'class', 'elipsis-container svelte-1x8e8c2');
			toggle_class(div3, 'active', /*showMenu*/ ctx[2] === /*address*/ ctx[12]);
			attr(div4, 'class', 'flex items-center svelte-1x8e8c2');
			attr(div5, 'class', 'container flex items-center justify-between pointer svelte-1x8e8c2');
			toggle_class(div5, 'primary', /*primary*/ ctx[1] && /*i*/ ctx[16] === 0);
			attr(div6, 'class', 'relative');
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div5);
			append(div5, div1);
			append(div1, div0);
			mount_component(walletappbadge, div0, null);
			append(div0, t0);
			if (if_block0) if_block0.m(div0, null);
			append(div1, t1);
			append(div1, span);
			append(span, t2);
			append(div5, t3);
			append(div5, div4);
			if (if_block1) if_block1.m(div4, null);
			append(div4, t4);
			append(div4, div3);
			append(div3, div2);
			div2.innerHTML = elipsisIcon;
			append(div6, t5);
			if (if_block2) if_block2.m(div6, null);
			append(div6, t6);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div2, 'click', stop_propagation(click_handler)),
					listen(div5, 'click', click_handler_1)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const walletappbadge_changes = {};

			if (dirty & /*primary*/ 2)
				walletappbadge_changes.customBackgroundColor =
					/*primary*/ ctx[1] && /*i*/ ctx[16] === 0
						? 'rgba(24, 206, 102, 0.2)'
						: 'rgba(235, 235, 237, 0.1)';

			if (dirty & /*primary*/ 2)
				walletappbadge_changes.border =
					/*primary*/ ctx[1] && /*i*/ ctx[16] === 0 ? 'green' : 'gray';

			if (dirty & /*wallet*/ 1) walletappbadge_changes.icon = /*wallet*/ ctx[0].icon;
			walletappbadge.$set(walletappbadge_changes);

			if (/*primary*/ ctx[1] && /*i*/ ctx[16] === 0) {
				if (if_block0) {
					if (dirty & /*primary*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3$2();
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div0, null);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (
				(!current || dirty & /*wallet*/ 1) &&
				t2_value !==
					(t2_value =
						/*ens*/ (ctx[13]
							? shortenEns(/*ens*/ ctx[13].name)
							: shortenAddress(/*address*/ ctx[12])) + '')
			)
				set_data(t2, t2_value);

			if (/*balance*/ ctx[14]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*wallet*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2$4(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div4, t4);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*showMenu, wallet*/ 5) {
				toggle_class(div3, 'active', /*showMenu*/ ctx[2] === /*address*/ ctx[12]);
			}

			if (dirty & /*primary*/ 2) {
				toggle_class(div5, 'primary', /*primary*/ ctx[1] && /*i*/ ctx[16] === 0);
			}

			if (/*showMenu*/ ctx[2] === /*address*/ ctx[12]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*showMenu, wallet*/ 5) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$9(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div6, t6);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(walletappbadge.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(walletappbadge.$$.fragment, local);
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div6);
			destroy_component(walletappbadge);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$d(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*wallet*/ ctx[0].accounts;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const out = (i) =>
		transition_out(each_blocks[i], 1, 1, () => {
			each_blocks[i] = null;
		});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (
				dirty &
				/*showMenu, disconnect, wallet, $_, en, setPrimaryWallet, primary, selectAnotherAccount, elipsisIcon, formatBalance, shortenEns, shortenAddress*/ 63
			) {
				each_value = /*wallet*/ ctx[0].accounts;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function formatBalance(balance) {
	const [asset] = Object.keys(balance);

	return `${balance[asset].length > 8 ? balance[asset].slice(0, 8) : balance[asset]} ${asset}`;
}

function instance$d($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(3, ($_ = $$value)));
	let { wallet } = $$props;
	let { primary } = $$props;

	function hideMenu() {
		$$invalidate(2, (showMenu = ''));
	}

	let showMenu = '';

	function setPrimaryWallet(wallet, account) {
		wallet.accounts = [
			account,
			...wallet.accounts.filter(({ address }) => address !== account.address)
		];

		addWallet(wallet);
	}

	async function selectAnotherAccount(wallet) {
		try {
			await selectAccounts(wallet.provider);
		} catch (error) {
			const { code } = error;

			if (
				code === ProviderRpcErrorCode.UNSUPPORTED_METHOD ||
				code === ProviderRpcErrorCode.DOES_NOT_EXIST
			) {
				connectWallet$.next({
					inProgress: false,
					actionRequired: wallet.label
				});
			}
		}
	}

	const click_handler = (address) =>
		$$invalidate(2, (showMenu = showMenu === address ? '' : address));
	const click_handler_1 = (address, ens, balance) =>
		setPrimaryWallet(wallet, { address, ens, balance });

	const click_handler_2 = () => {
		$$invalidate(2, (showMenu = ''));
		selectAnotherAccount(wallet);
	};

	const click_handler_3 = (address, ens, balance) => {
		$$invalidate(2, (showMenu = ''));
		setPrimaryWallet(wallet, { address, ens, balance });
	};

	const click_handler_4 = () => {
		$$invalidate(2, (showMenu = ''));
		disconnect({ label: wallet.label });
	};

	$$self.$$set = ($$props) => {
		if ('wallet' in $$props) $$invalidate(0, (wallet = $$props.wallet));
		if ('primary' in $$props) $$invalidate(1, (primary = $$props.primary));
	};

	return [
		wallet,
		primary,
		showMenu,
		$_,
		setPrimaryWallet,
		selectAnotherAccount,
		hideMenu,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		click_handler_4
	];
}

class WalletRow extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$d,
			create_fragment$d,
			safe_not_equal,
			{ wallet: 0, primary: 1, hideMenu: 6 },
			add_css$c
		);
	}

	get hideMenu() {
		return this.$$.ctx[6];
	}
}

var plusCircleIcon = `
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
  </svg>
`;

var arrowForwardIcon = `
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.09 15.59L11.5 17L16.5 12L11.5 7L10.09 8.41L12.67 11H3V13H12.67L10.09 15.59ZM19 3H5C3.89 3 3 3.9 3 5V9H5V5H19V19H5V15H3V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor"/>
  </svg>
`;

var caretIcon = `<svg width="100%" height="24" viewBox="0 5 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10L12 15L17 10H7Z" fill="currentColor"/></svg>`;

/* src/views/shared/NetworkSelector.svelte generated by Svelte v3.48.0 */

function add_css$b(target) {
	append_styles(
		target,
		'svelte-1ebzu2l',
		'select.svelte-1ebzu2l{border:none;background-image:none;background-color:transparent;-webkit-appearance:none;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;appearance:none;font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));max-width:90px;min-width:72px;transition:width 250ms ease-in-out;background-repeat:no-repeat, repeat;background-position:right 0px top 0px, 0 0;scrollbar-width:none;-ms-overflow-style:none;padding:0 16px 0 0}select.svelte-1ebzu2l:focus{outline:none}span.svelte-1ebzu2l{font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3))}'
	);
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

// (79:0) {#if wallet}
function create_if_block$8(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*$switching$*/ ctx[6]) return create_if_block_1$5;
		return create_else_block$2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (82:2) {:else}
function create_else_block$2(ctx) {
	let select;
	let show_if = !connectedToValidAppChain(/*wallet*/ ctx[5].chains[0], /*chains*/ ctx[2]);
	let if_block_anchor;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let select_value_value;
	let select_style_value;
	let mounted;
	let dispose;
	let if_block = show_if && create_if_block_2$3(ctx);
	let each_value = /*chains*/ ctx[2];
	const get_key = (ctx) => /*chain*/ ctx[14].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$2(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, (each_blocks[i] = create_each_block$2(key, child_ctx)));
	}

	return {
		c() {
			select = element('select');
			if (if_block) if_block.c();
			if_block_anchor = empty();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(select, 'class', 'flex justify-center items-center pointer svelte-1ebzu2l');
			attr(
				select,
				'style',
				(select_style_value = `color: ${
					/*color*/ ctx[1]
				}; background-image: url('data:image/svg+xml;utf8,${/*selectIcon*/ ctx[0]}'); ${
					/*bold*/ ctx[3] ? 'font-weight: 700;' : ''
				}`)
			);
		},
		m(target, anchor) {
			insert(target, select, anchor);
			if (if_block) if_block.m(select, null);
			append(select, if_block_anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*wallet*/ ctx[5].chains[0].id);
			/*select_binding*/ ctx[12](select);

			if (!mounted) {
				dispose = listen(select, 'change', /*handleSelect*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*wallet, chains*/ 36)
				show_if = !connectedToValidAppChain(/*wallet*/ ctx[5].chains[0], /*chains*/ ctx[2]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2$3(ctx);
					if_block.c();
					if_block.m(select, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*chains*/ 4) {
				each_value = /*chains*/ ctx[2];
				each_blocks = update_keyed_each(
					each_blocks,
					dirty,
					get_key,
					1,
					ctx,
					each_value,
					each_1_lookup,
					select,
					destroy_block,
					create_each_block$2,
					null,
					get_each_context$2
				);
			}

			if (
				dirty & /*wallet*/ 32 &&
				select_value_value !== (select_value_value = /*wallet*/ ctx[5].chains[0].id)
			) {
				select_option(select, /*wallet*/ ctx[5].chains[0].id);
			}

			if (
				dirty & /*color, selectIcon, bold*/ 11 &&
				select_style_value !==
					(select_style_value = `color: ${
						/*color*/ ctx[1]
					}; background-image: url('data:image/svg+xml;utf8,${/*selectIcon*/ ctx[0]}'); ${
						/*bold*/ ctx[3] ? 'font-weight: 700;' : ''
					}`)
			) {
				attr(select, 'style', select_style_value);
			}
		},
		d(detaching) {
			if (detaching) detach(select);
			if (if_block) if_block.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			/*select_binding*/ ctx[12](null);
			mounted = false;
			dispose();
		}
	};
}

// (80:2) {#if $switching$}
function create_if_block_1$5(ctx) {
	let span;
	let t;
	let span_style_value;

	return {
		c() {
			span = element('span');
			t = text('switching...');
			attr(span, 'style', (span_style_value = `color: ${/*color*/ ctx[1]}; padding: 0 8px 0 4px;`));
			attr(span, 'class', 'svelte-1ebzu2l');
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*color*/ 2 &&
				span_style_value !==
					(span_style_value = `color: ${/*color*/ ctx[1]}; padding: 0 8px 0 4px;`)
			) {
				attr(span, 'style', span_style_value);
			}
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (92:6) {#if !connectedToValidAppChain(wallet.chains[0], chains)}
function create_if_block_2$3(ctx) {
	let option;
	let t_value = (chainIdToLabel[/*wallet*/ ctx[5].chains[0].id] || 'unrecognized') + '';
	let t;
	let option_value_value;

	return {
		c() {
			option = element('option');
			t = text(t_value);
			option.__value = option_value_value = /*wallet*/ ctx[5].chains[0].id;
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*wallet*/ 32 &&
				t_value !==
					(t_value = (chainIdToLabel[/*wallet*/ ctx[5].chains[0].id] || 'unrecognized') + '')
			)
				set_data(t, t_value);

			if (
				dirty & /*wallet*/ 32 &&
				option_value_value !== (option_value_value = /*wallet*/ ctx[5].chains[0].id)
			) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (97:6) {#each chains as chain (chain.id)}
function create_each_block$2(key_1, ctx) {
	let option;
	let t_value = /*chain*/ ctx[14].label + '';
	let t;
	let option_value_value;

	return {
		key: key_1,
		first: null,
		c() {
			option = element('option');
			t = text(t_value);
			option.__value = option_value_value = /*chain*/ ctx[14].id;
			option.value = option.__value;
			this.first = option;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*chains*/ 4 && t_value !== (t_value = /*chain*/ ctx[14].label + ''))
				set_data(t, t_value);

			if (
				dirty & /*chains*/ 4 &&
				option_value_value !== (option_value_value = /*chain*/ ctx[14].id)
			) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

function create_fragment$c(ctx) {
	let if_block_anchor;
	let if_block = /*wallet*/ ctx[5] && create_if_block$8(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*wallet*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$8(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$c($$self, $$props, $$invalidate) {
	let wallet;
	let $resize$;
	let $wallets$;
	let $switching$;
	component_subscribe($$self, wallets$, ($$value) => $$invalidate(11, ($wallets$ = $$value)));
	let { selectIcon = caretIcon } = $$props;
	let { color = '#33394B' } = $$props;
	let { chains } = $$props;
	let { bold = false } = $$props;
	const switching$ = new BehaviorSubject(false);
	component_subscribe($$self, switching$, (value) => $$invalidate(6, ($switching$ = value)));
	let selectElement;

	const resize$ = merge$1(wallets$, switching$.pipe(skip(1))).pipe(
		debounceTime(50),
		distinctUntilChanged((prev, next) =>
			typeof prev === 'boolean' || typeof next === 'boolean'
				? false
				: prev[0] && next[0] && prev[0].chains[0].id === next[0].chains[0].id
		)
	);

	component_subscribe($$self, resize$, (value) => $$invalidate(10, ($resize$ = value)));

	async function handleSelect() {
		const selectedChain = selectElement.selectedOptions[0].value;

		if (selectedChain !== wallet.chains[0].id) {
			switching$.next(true);

			await setChain({
				chainId: selectedChain,
				chainNamespace: 'evm',
				wallet: wallet.label
			});

			switching$.next(false);
		}
	}

	function resizeSelect() {
		if (!selectElement) return;
		let tempOption = document.createElement('option');
		tempOption.textContent = selectElement.selectedOptions[0].textContent;
		let tempSelect = document.createElement('select');
		tempSelect.style.visibility = 'hidden';
		tempSelect.style.position = 'fixed';
		tempSelect.appendChild(tempOption);
		selectElement.after(tempSelect);
		$$invalidate(
			4,
			(selectElement.style.width = `${tempSelect.clientWidth - 22}px`),
			selectElement
		);
		tempSelect.remove();
	}

	function select_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			selectElement = $$value;
			$$invalidate(4, selectElement);
			$$invalidate(2, chains);
			$$invalidate(5, wallet), $$invalidate(11, $wallets$);
		});
	}

	$$self.$$set = ($$props) => {
		if ('selectIcon' in $$props) $$invalidate(0, (selectIcon = $$props.selectIcon));
		if ('color' in $$props) $$invalidate(1, (color = $$props.color));
		if ('chains' in $$props) $$invalidate(2, (chains = $$props.chains));
		if ('bold' in $$props) $$invalidate(3, (bold = $$props.bold));
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$wallets$*/ 2048) {
			$$invalidate(5, ([wallet] = $wallets$), wallet);
		}

		if ($$self.$$.dirty & /*$resize$*/ 1024) {
			if ($resize$) {
				resizeSelect();
			}
		}
	};

	return [
		selectIcon,
		color,
		chains,
		bold,
		selectElement,
		wallet,
		$switching$,
		switching$,
		resize$,
		handleSelect,
		$resize$,
		$wallets$,
		select_binding
	];
}

class NetworkSelector extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$c,
			create_fragment$c,
			safe_not_equal,
			{
				selectIcon: 0,
				color: 1,
				chains: 2,
				bold: 3
			},
			add_css$b
		);
	}
}

var caretLightIcon = `<svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="currentColor"/></svg>`;

var warningIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor"/>
  </svg>
`;

/* src/views/account-center/DisconnectAllConfirm.svelte generated by Svelte v3.48.0 */

function add_css$a(target) {
	append_styles(
		target,
		'svelte-10lq1b5',
		'.content.svelte-10lq1b5{padding:1rem;width:300px;font-family:var(--onboard-font-family-normal, var(--font-family-normal));font-size:var(--onboard-font-size-5, var(--font-size-5));line-height:24px}.icon-container.svelte-10lq1b5{width:3rem;height:3rem;background:var(--onboard-warning-100, var(--warning-100));border-radius:24px;padding:12px;color:var(--onboard-warning-500, var(--warning-500))}h4.svelte-10lq1b5{margin:1.5rem 0 0.5rem 0;font-weight:700}p.svelte-10lq1b5{margin:0;font-weight:400}button.svelte-10lq1b5{margin-top:1.5rem;width:50%;font-weight:700}.right.svelte-10lq1b5{margin-left:0.5rem;width:60%}'
	);
}

// (49:0) <Modal close={onClose}>
function create_default_slot(ctx) {
	let div2;
	let div0;
	let t0;
	let h4;

	let t1_value =
		/*$_*/ ctx[2]('modals.confirmDisconnectAll.heading', {
			default: en.modals.confirmDisconnectAll.heading
		}) + '';

	let t1;
	let t2;
	let p;
	let t3_value = /*$_*/ ctx[2]('modals.confirmDisconnectAll.description') + '';
	let t3;
	let t4;
	let div1;
	let button0;

	let t5_value =
		/*$_*/ ctx[2]('modals.confirmDisconnectAll.cancel', {
			default: en.modals.confirmDisconnectAll.cancel
		}) + '';

	let t5;
	let t6;
	let button1;

	let t7_value =
		/*$_*/ ctx[2]('modals.confirmDisconnectAll.confirm', {
			default: en.modals.confirmDisconnectAll.confirm
		}) + '';

	let t7;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element('div');
			div0 = element('div');
			t0 = space();
			h4 = element('h4');
			t1 = text(t1_value);
			t2 = space();
			p = element('p');
			t3 = text(t3_value);
			t4 = space();
			div1 = element('div');
			button0 = element('button');
			t5 = text(t5_value);
			t6 = space();
			button1 = element('button');
			t7 = text(t7_value);
			attr(div0, 'class', 'icon-container flex justify-center items-center svelte-10lq1b5');
			attr(h4, 'class', 'svelte-10lq1b5');
			attr(p, 'class', 'svelte-10lq1b5');
			attr(button0, 'class', 'button-neutral-solid-b rounded svelte-10lq1b5');
			attr(button1, 'class', 'right button-neutral-solid rounded svelte-10lq1b5');
			attr(div1, 'class', 'flex justify-between items-center w-100');
			attr(div2, 'class', 'content svelte-10lq1b5');
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			div0.innerHTML = warningIcon;
			append(div2, t0);
			append(div2, h4);
			append(h4, t1);
			append(div2, t2);
			append(div2, p);
			append(p, t3);
			append(div2, t4);
			append(div2, div1);
			append(div1, button0);
			append(button0, t5);
			append(div1, t6);
			append(div1, button1);
			append(button1, t7);

			if (!mounted) {
				dispose = [
					listen(button0, 'click', function () {
						if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
					}),
					listen(button1, 'click', function () {
						if (is_function(/*onConfirm*/ ctx[0])) /*onConfirm*/ ctx[0].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (
				dirty & /*$_*/ 4 &&
				t1_value !==
					(t1_value =
						/*$_*/ ctx[2]('modals.confirmDisconnectAll.heading', {
							default: en.modals.confirmDisconnectAll.heading
						}) + '')
			)
				set_data(t1, t1_value);

			if (
				dirty & /*$_*/ 4 &&
				t3_value !== (t3_value = /*$_*/ ctx[2]('modals.confirmDisconnectAll.description') + '')
			)
				set_data(t3, t3_value);

			if (
				dirty & /*$_*/ 4 &&
				t5_value !==
					(t5_value =
						/*$_*/ ctx[2]('modals.confirmDisconnectAll.cancel', {
							default: en.modals.confirmDisconnectAll.cancel
						}) + '')
			)
				set_data(t5, t5_value);

			if (
				dirty & /*$_*/ 4 &&
				t7_value !==
					(t7_value =
						/*$_*/ ctx[2]('modals.confirmDisconnectAll.confirm', {
							default: en.modals.confirmDisconnectAll.confirm
						}) + '')
			)
				set_data(t7, t7_value);
		},
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$b(ctx) {
	let modal;
	let current;

	modal = new Modal({
		props: {
			close: /*onClose*/ ctx[1],
			$$slots: { default: [create_default_slot] },
			$$scope: { ctx }
		}
	});

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const modal_changes = {};
			if (dirty & /*onClose*/ 2) modal_changes.close = /*onClose*/ ctx[1];

			if (dirty & /*$$scope, onConfirm, $_, onClose*/ 15) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, ($$value) => $$invalidate(2, ($_ = $$value)));
	let { onConfirm } = $$props;
	let { onClose } = $$props;

	$$self.$$set = ($$props) => {
		if ('onConfirm' in $$props) $$invalidate(0, (onConfirm = $$props.onConfirm));
		if ('onClose' in $$props) $$invalidate(1, (onClose = $$props.onClose));
	};

	return [onConfirm, onClose, $_];
}

class DisconnectAllConfirm extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$b,
			create_fragment$b,
			safe_not_equal,
			{ onConfirm: 0, onClose: 1 },
			add_css$a
		);
	}
}

/* src/views/account-center/Maximized.svelte generated by Svelte v3.48.0 */

function add_css$9(target) {
	append_styles(
		target,
		'svelte-19qmfg7',
		'.outer-container.svelte-19qmfg7{background:var(--onboard-gray-600, var(--gray-600));border-radius:var(--onboard-border-radius-3, var(--border-radius-3));width:100%;filter:drop-shadow(0px 4px 16px rgba(178, 178, 178, 0.2));padding:0 1px 1px 1px;pointer-events:auto}.wallets-section.svelte-19qmfg7{width:100%;border-radius:var(--onboard-border-radius-3, var(--border-radius-3))}.p5.svelte-19qmfg7{padding:var(--onboard-spacing-5, var(--spacing-5))}.wallets.svelte-19qmfg7{width:100%;margin-bottom:0.5rem}.actions.svelte-19qmfg7{color:var(--onboard-primary-400, var(--primary-400));padding-left:2px}.action-container.svelte-19qmfg7{padding:4px 12px 4px 8px;border-radius:8px;transition:background-color 150ms ease-in-out}.action-container.svelte-19qmfg7:hover{background-color:rgba(146, 155, 237, 0.2)}.plus-icon.svelte-19qmfg7{width:20px}.arrow-forward.svelte-19qmfg7{width:20px}.mt.svelte-19qmfg7{margin-top:0.25rem}.action-text.svelte-19qmfg7{font-size:var(--onboard-font-size-6, var(--font-size-6));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));margin-left:0.5rem}.background-blue.svelte-19qmfg7{background:var(--onboard-primary-100, var(--primary-100))}.background-gray.svelte-19qmfg7{background:var(--onboard-gray-100, var(--gray-100))}.background-yellow.svelte-19qmfg7{background:var(--onboard-warning-100, var(--warning-100))}.network-container.svelte-19qmfg7{border-radius:var(--onboard-border-radius-3, var(--border-radius-3));color:var(--onboard-gray-500, var(--gray-500))}.p5-5.svelte-19qmfg7{padding:12px}.network-selector-container.svelte-19qmfg7{margin-left:1rem}.network-selector-label.svelte-19qmfg7{font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3))}.app-info-container.svelte-19qmfg7{background:var(--onboard-white, var(--white));border-radius:16px;padding:12px}.app-name.svelte-19qmfg7{font-weight:700;font-size:var(--onboard-font-size-5, var(--font-size-5));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));color:var(--onboard-gray-600, var(--gray-600));margin-bottom:var(--onboard-spacing-5, var(--spacing-5));margin-top:0}.app-description.svelte-19qmfg7{font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));color:var(--onboard-gray-500, var(--gray-500));margin:0}.app-info.svelte-19qmfg7{font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));color:var(--onboard-gray-500, var(--gray-500))}.app-info-heading.svelte-19qmfg7{color:var(--onboard-gray-600, var(--gray-600));font-weight:700;margin-top:var(--onboard-spacing-5, var(--spacing-5));margin-bottom:var(--onboard-spacing-7, var(--spacing-7))}a.svelte-19qmfg7{font-weight:700}.mt7.svelte-19qmfg7{margin-top:var(--onboard-spacing-7, var(--spacing-7))}.ml4.svelte-19qmfg7{margin-left:var(--onboard-spacing-4, var(--spacing-4))}.app-button.svelte-19qmfg7{margin-top:var(--onboard-spacing-5, var(--spacing-5))}.powered-by-container.svelte-19qmfg7{margin-top:12px}.powered-by.svelte-19qmfg7{color:var(--onboard-gray-400, var(--gray-400));font-size:var(--onboard-font-size-7, var(--font-size-7));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3))}'
	);
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	child_ctx[21] = i;
	return child_ctx;
}

// (188:0) {#if disconnectConfirmModal}
function create_if_block_5$1(ctx) {
	let disconnectallconfirm;
	let current;

	disconnectallconfirm = new DisconnectAllConfirm({
		props: {
			onClose: /*func*/ ctx[14],
			onConfirm: /*disconnectAllWallets*/ ctx[6]
		}
	});

	return {
		c() {
			create_component(disconnectallconfirm.$$.fragment);
		},
		m(target, anchor) {
			mount_component(disconnectallconfirm, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const disconnectallconfirm_changes = {};
			if (dirty & /*disconnectConfirmModal*/ 2)
				disconnectallconfirm_changes.onClose = /*func*/ ctx[14];
			disconnectallconfirm.$set(disconnectallconfirm_changes);
		},
		i(local) {
			if (current) return;
			transition_in(disconnectallconfirm.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(disconnectallconfirm.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(disconnectallconfirm, detaching);
		}
	};
}

// (211:8) {#each $wallets$ as wallet, i (wallet.label)}
function create_each_block$1(key_1, ctx) {
	let first;
	let walletrow;
	let updating_hideMenu;
	let current;

	function walletrow_hideMenu_binding(value) {
		/*walletrow_hideMenu_binding*/ ctx[15](value);
	}

	let walletrow_props = {
		wallet: /*wallet*/ ctx[19],
		primary: /*i*/ ctx[21] === 0
	};

	if (/*hideWalletRowMenu*/ ctx[2] !== void 0) {
		walletrow_props.hideMenu = /*hideWalletRowMenu*/ ctx[2];
	}

	walletrow = new WalletRow({ props: walletrow_props });
	binding_callbacks.push(() => bind(walletrow, 'hideMenu', walletrow_hideMenu_binding));

	return {
		key: key_1,
		first: null,
		c() {
			first = empty();
			create_component(walletrow.$$.fragment);
			this.first = first;
		},
		m(target, anchor) {
			insert(target, first, anchor);
			mount_component(walletrow, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const walletrow_changes = {};
			if (dirty & /*$wallets$*/ 1) walletrow_changes.wallet = /*wallet*/ ctx[19];
			if (dirty & /*$wallets$*/ 1) walletrow_changes.primary = /*i*/ ctx[21] === 0;

			if (!updating_hideMenu && dirty & /*hideWalletRowMenu*/ 4) {
				updating_hideMenu = true;
				walletrow_changes.hideMenu = /*hideWalletRowMenu*/ ctx[2];
				add_flush_callback(() => (updating_hideMenu = false));
			}

			walletrow.$set(walletrow_changes);
		},
		i(local) {
			if (current) return;
			transition_in(walletrow.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(walletrow.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(first);
			destroy_component(walletrow, detaching);
		}
	};
}

// (222:8) {#if device.type === 'desktop'}
function create_if_block_4$1(ctx) {
	let div1;
	let div0;
	let t0;
	let span0;

	let t1_value =
		/*$_*/ ctx[5]('accountCenter.connectAnotherWallet', {
			default: en.accountCenter.connectAnotherWallet
		}) + '';

	let t1;
	let t2;
	let div3;
	let div2;
	let t3;
	let span1;

	let t4_value =
		/*$_*/ ctx[5]('accountCenter.disconnectAllWallets', {
			default: en.accountCenter.disconnectAllWallets
		}) + '';

	let t4;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element('div');
			div0 = element('div');
			t0 = space();
			span0 = element('span');
			t1 = text(t1_value);
			t2 = space();
			div3 = element('div');
			div2 = element('div');
			t3 = space();
			span1 = element('span');
			t4 = text(t4_value);
			attr(div0, 'class', 'plus-icon flex items-center justify-center svelte-19qmfg7');
			attr(span0, 'class', 'action-text svelte-19qmfg7');
			attr(div1, 'class', 'action-container flex items-center pointer svelte-19qmfg7');
			attr(div2, 'class', 'arrow-forward flex items-center justify-center svelte-19qmfg7');
			attr(span1, 'class', 'action-text svelte-19qmfg7');
			attr(div3, 'class', 'action-container flex items-center mt pointer svelte-19qmfg7');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			div0.innerHTML = plusCircleIcon;
			append(div1, t0);
			append(div1, span0);
			append(span0, t1);
			insert(target, t2, anchor);
			insert(target, div3, anchor);
			append(div3, div2);
			div2.innerHTML = arrowForwardIcon;
			append(div3, t3);
			append(div3, span1);
			append(span1, t4);

			if (!mounted) {
				dispose = [
					listen(div1, 'click', /*click_handler_1*/ ctx[16]),
					listen(div3, 'click', /*click_handler_2*/ ctx[17])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 32 &&
				t1_value !==
					(t1_value =
						/*$_*/ ctx[5]('accountCenter.connectAnotherWallet', {
							default: en.accountCenter.connectAnotherWallet
						}) + '')
			)
				set_data(t1, t1_value);

			if (
				dirty & /*$_*/ 32 &&
				t4_value !==
					(t4_value =
						/*$_*/ ctx[5]('accountCenter.disconnectAllWallets', {
							default: en.accountCenter.disconnectAllWallets
						}) + '')
			)
				set_data(t4, t4_value);
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (detaching) detach(t2);
			if (detaching) detach(div3);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (290:10) {#if validAppChain}
function create_if_block_3$1(ctx) {
	let div;
	let successstatusicon;
	let current;
	successstatusicon = new SuccessStatusIcon({ props: { size: 14 } });

	return {
		c() {
			div = element('div');
			create_component(successstatusicon.$$.fragment);
			set_style(div, 'right', '-5px');
			set_style(div, 'bottom', '-5px');
			attr(div, 'class', 'drop-shadow absolute');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(successstatusicon, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(successstatusicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(successstatusicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(successstatusicon);
		}
	};
}

// (352:8) {#if appMetadata && (appMetadata.gettingStartedGuide || appMetadata.explore)}
function create_if_block$7(ctx) {
	let div;
	let h4;
	let t0_value = /*$_*/ ctx[5]('accountCenter.appInfo', { default: en.accountCenter.appInfo }) + '';
	let t0;
	let t1;
	let t2;
	let if_block0 = /*appMetadata*/ ctx[8].gettingStartedGuide && create_if_block_2$2(ctx);
	let if_block1 = /*appMetadata*/ ctx[8].explore && create_if_block_1$4(ctx);

	return {
		c() {
			div = element('div');
			h4 = element('h4');
			t0 = text(t0_value);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			attr(h4, 'class', 'app-info-heading svelte-19qmfg7');
			attr(div, 'class', 'app-info svelte-19qmfg7');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h4);
			append(h4, t0);
			append(div, t1);
			if (if_block0) if_block0.m(div, null);
			append(div, t2);
			if (if_block1) if_block1.m(div, null);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 32 &&
				t0_value !==
					(t0_value =
						/*$_*/ ctx[5]('accountCenter.appInfo', { default: en.accountCenter.appInfo }) + '')
			)
				set_data(t0, t0_value);
			if (/*appMetadata*/ ctx[8].gettingStartedGuide) if_block0.p(ctx, dirty);
			if (/*appMetadata*/ ctx[8].explore) if_block1.p(ctx, dirty);
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (360:12) {#if appMetadata.gettingStartedGuide}
function create_if_block_2$2(ctx) {
	let div1;
	let div0;
	let t0_value =
		/*$_*/ ctx[5]('accountCenter.learnMore', { default: en.accountCenter.learnMore }) + '';
	let t0;
	let t1;
	let a;

	let t2_value =
		/*$_*/ ctx[5]('accountCenter.gettingStartedGuide', {
			default: en.accountCenter.gettingStartedGuide
		}) + '';

	let t2;
	let a_href_value;

	return {
		c() {
			div1 = element('div');
			div0 = element('div');
			t0 = text(t0_value);
			t1 = space();
			a = element('a');
			t2 = text(t2_value);
			attr(a, 'href', (a_href_value = /*appMetadata*/ ctx[8].gettingStartedGuide));
			attr(a, 'target', '_blank');
			attr(a, 'rel', 'noreferrer noopener');
			attr(a, 'class', 'svelte-19qmfg7');
			attr(div1, 'class', 'flex justify-between items-center mt7 svelte-19qmfg7');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div1, t1);
			append(div1, a);
			append(a, t2);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 32 &&
				t0_value !==
					(t0_value =
						/*$_*/ ctx[5]('accountCenter.learnMore', { default: en.accountCenter.learnMore }) + '')
			)
				set_data(t0, t0_value);

			if (
				dirty & /*$_*/ 32 &&
				t2_value !==
					(t2_value =
						/*$_*/ ctx[5]('accountCenter.gettingStartedGuide', {
							default: en.accountCenter.gettingStartedGuide
						}) + '')
			)
				set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

// (379:12) {#if appMetadata.explore}
function create_if_block_1$4(ctx) {
	let div1;
	let div0;
	let t0_value =
		/*$_*/ ctx[5]('accountCenter.smartContracts', { default: en.accountCenter.smartContracts }) +
		'';
	let t0;
	let t1;
	let a;
	let t2_value = /*$_*/ ctx[5]('accountCenter.explore', { default: en.accountCenter.explore }) + '';
	let t2;
	let a_href_value;

	return {
		c() {
			div1 = element('div');
			div0 = element('div');
			t0 = text(t0_value);
			t1 = space();
			a = element('a');
			t2 = text(t2_value);
			attr(a, 'href', (a_href_value = /*appMetadata*/ ctx[8].explore));
			attr(a, 'target', '_blank');
			attr(a, 'rel', 'noreferrer noopener');
			attr(a, 'class', 'svelte-19qmfg7');
			attr(div1, 'class', 'flex justify-between items-center mt7 svelte-19qmfg7');
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div1, t1);
			append(div1, a);
			append(a, t2);
		},
		p(ctx, dirty) {
			if (
				dirty & /*$_*/ 32 &&
				t0_value !==
					(t0_value =
						/*$_*/ ctx[5]('accountCenter.smartContracts', {
							default: en.accountCenter.smartContracts
						}) + '')
			)
				set_data(t0, t0_value);
			if (
				dirty & /*$_*/ 32 &&
				t2_value !==
					(t2_value =
						/*$_*/ ctx[5]('accountCenter.explore', { default: en.accountCenter.explore }) + '')
			)
				set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function create_fragment$a(ctx) {
	let t0;
	let div16;
	let div15;
	let div2;
	let div0;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t1;
	let div1;
	let t2;
	let div14;
	let div7;
	let div3;
	let walletappbadge0;
	let t3;
	let t4;
	let div6;
	let div4;
	let t5_value =
		/*$_*/ ctx[5]('accountCenter.currentNetwork', { default: en.accountCenter.currentNetwork }) +
		'';
	let t5;
	let t6;
	let div5;
	let networkbadgeselector;
	let t7;
	let div13;
	let div11;
	let div9;
	let walletappbadge1;
	let t8;
	let div8;
	let successstatusicon;
	let t9;
	let div10;
	let h4;
	let t11;
	let p;
	let t13;
	let t14;
	let button;
	let t15_value =
		/*$_*/ ctx[5]('accountCenter.backToApp', { default: en.accountCenter.backToApp }) + '';
	let t15;
	let t16;
	let a;
	let span;
	let t17_value =
		/*$_*/ ctx[5]('accountCenter.poweredBy', { default: en.accountCenter.poweredBy }) + '';
	let t17;
	let t18;
	let div12;
	let div16_intro;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*disconnectConfirmModal*/ ctx[1] && create_if_block_5$1(ctx);
	let each_value = /*$wallets$*/ ctx[0];
	const get_key = (ctx) => /*wallet*/ ctx[19].label;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, (each_blocks[i] = create_each_block$1(key, child_ctx)));
	}

	let if_block1 = /*device*/ ctx[10].type === 'desktop' && create_if_block_4$1(ctx);

	walletappbadge0 = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'custom',
			color: !(/*validAppChain*/ ctx[4])
				? '#FFAF00'
				: !(/*validAppChain*/ ctx[4].icon)
				? '#EFF1FC'
				: undefined,
			customBackgroundColor: /*validAppChain*/ ctx[4]
				? /*validAppChain*/ ctx[4].color ||
				  /*defaultChainStyles*/ (ctx[3] && /*defaultChainStyles*/ ctx[3].color) ||
				  unrecognizedChainStyle.color
				: '#FFE7B3',
			border: 'transparent',
			radius: 8,
			icon: /*validAppChain*/ ctx[4]
				? /*validAppChain*/ ctx[4].icon ||
				  /*defaultChainStyles*/ (ctx[3] && /*defaultChainStyles*/ ctx[3].icon) ||
				  unrecognizedChainStyle.icon
				: warningIcon
		}
	});

	let if_block2 = /*validAppChain*/ ctx[4] && create_if_block_3$1();

	networkbadgeselector = new NetworkSelector({
		props: {
			chains: /*appChains*/ ctx[7],
			color: '#33394B',
			bold: true,
			selectIcon: caretLightIcon
		}
	});

	walletappbadge1 = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'transparent',
			border: 'black',
			radius: 8,
			icon: /*appMetadata*/ (ctx[8] && /*appMetadata*/ ctx[8].icon) || questionIcon
		}
	});

	successstatusicon = new SuccessStatusIcon({ props: { size: 14, color: 'blue' } });
	let if_block3 =
		/*appMetadata*/ ctx[8] &&
		/*appMetadata*/ (ctx[8].gettingStartedGuide || /*appMetadata*/ ctx[8].explore) &&
		create_if_block$7(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			div16 = element('div');
			div15 = element('div');
			div2 = element('div');
			div0 = element('div');

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			div1 = element('div');
			if (if_block1) if_block1.c();
			t2 = space();
			div14 = element('div');
			div7 = element('div');
			div3 = element('div');
			create_component(walletappbadge0.$$.fragment);
			t3 = space();
			if (if_block2) if_block2.c();
			t4 = space();
			div6 = element('div');
			div4 = element('div');
			t5 = text(t5_value);
			t6 = space();
			div5 = element('div');
			create_component(networkbadgeselector.$$.fragment);
			t7 = space();
			div13 = element('div');
			div11 = element('div');
			div9 = element('div');
			create_component(walletappbadge1.$$.fragment);
			t8 = space();
			div8 = element('div');
			create_component(successstatusicon.$$.fragment);
			t9 = space();
			div10 = element('div');
			h4 = element('h4');
			h4.textContent = `${/*appMetadata*/ (ctx[8] && /*appMetadata*/ ctx[8].name) || 'App Name'}`;
			t11 = space();
			p = element('p');
			p.textContent = `${
				/*appMetadata*/ (ctx[8] && /*appMetadata*/ ctx[8].description) ||
				'This app has not added a description.'
			}`;
			t13 = space();
			if (if_block3) if_block3.c();
			t14 = space();
			button = element('button');
			t15 = text(t15_value);
			t16 = space();
			a = element('a');
			span = element('span');
			t17 = text(t17_value);
			t18 = space();
			div12 = element('div');
			attr(div0, 'class', 'wallets svelte-19qmfg7');
			attr(div1, 'class', 'actions flex flex-column items-start svelte-19qmfg7');
			attr(div2, 'class', 'p5 svelte-19qmfg7');
			attr(div3, 'class', 'relative flex');
			attr(div4, 'class', 'network-selector-label svelte-19qmfg7');
			attr(div5, 'class', 'flex items-center');
			attr(div6, 'class', 'network-selector-container svelte-19qmfg7');
			attr(div7, 'class', 'flex items-center p5-5 svelte-19qmfg7');
			set_style(div8, 'right', '-5px');
			set_style(div8, 'bottom', '-5px');
			attr(div8, 'class', 'drop-shadow absolute');
			attr(div9, 'class', 'relative flex');
			attr(h4, 'class', 'app-name svelte-19qmfg7');
			attr(p, 'class', 'app-description svelte-19qmfg7');
			attr(div10, 'class', 'ml4 svelte-19qmfg7');
			attr(div11, 'class', 'flex items-start');
			attr(button, 'class', 'app-button button-neutral-solid svelte-19qmfg7');
			attr(span, 'class', 'powered-by svelte-19qmfg7');
			attr(div12, 'class', 'flex items-center');
			set_style(div12, 'width', '83px');
			set_style(div12, 'margin-left', '4px');
			attr(a, 'href', 'https://blocknative.com');
			attr(a, 'target', '_blank');
			attr(a, 'rel', 'noopener noreferrer');
			attr(a, 'class', 'flex justify-center items-center powered-by-container svelte-19qmfg7');
			attr(div13, 'class', 'app-info-container svelte-19qmfg7');
			attr(div14, 'class', 'network-container shadow-1 svelte-19qmfg7');
			toggle_class(
				div14,
				'background-blue',
				/*validAppChain*/ (ctx[4] && /*validAppChain*/ ctx[4].icon) || /*defaultChainStyles*/ ctx[3]
			);
			toggle_class(div14, 'background-yellow', !(/*validAppChain*/ ctx[4]));
			toggle_class(
				div14,
				'background-gray',
				/*validAppChain*/ ctx[4] && !(/*defaultChainStyles*/ ctx[3])
			);
			attr(div15, 'class', 'wallets-section svelte-19qmfg7');
			attr(div16, 'class', 'outer-container svelte-19qmfg7');
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			insert(target, div16, anchor);
			append(div16, div15);
			append(div15, div2);
			append(div2, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			append(div2, t1);
			append(div2, div1);
			if (if_block1) if_block1.m(div1, null);
			append(div15, t2);
			append(div15, div14);
			append(div14, div7);
			append(div7, div3);
			mount_component(walletappbadge0, div3, null);
			append(div3, t3);
			if (if_block2) if_block2.m(div3, null);
			append(div7, t4);
			append(div7, div6);
			append(div6, div4);
			append(div4, t5);
			append(div6, t6);
			append(div6, div5);
			mount_component(networkbadgeselector, div5, null);
			append(div14, t7);
			append(div14, div13);
			append(div13, div11);
			append(div11, div9);
			mount_component(walletappbadge1, div9, null);
			append(div9, t8);
			append(div9, div8);
			mount_component(successstatusicon, div8, null);
			append(div11, t9);
			append(div11, div10);
			append(div10, h4);
			append(div10, t11);
			append(div10, p);
			append(div13, t13);
			if (if_block3) if_block3.m(div13, null);
			append(div13, t14);
			append(div13, button);
			append(button, t15);
			append(div13, t16);
			append(div13, a);
			append(a, span);
			append(span, t17);
			append(a, t18);
			append(a, div12);
			div12.innerHTML = blocknative;
			current = true;

			if (!mounted) {
				dispose = [
					listen(div5, 'click', /*click_handler*/ ctx[13]),
					listen(button, 'click', /*click_handler_3*/ ctx[18]),
					listen(
						div16,
						'click',
						stop_propagation(function () {
							if (is_function(/*hideWalletRowMenu*/ ctx[2]))
								/*hideWalletRowMenu*/ ctx[2].apply(this, arguments);
						})
					)
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (/*disconnectConfirmModal*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*disconnectConfirmModal*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (dirty & /*$wallets$, hideWalletRowMenu*/ 5) {
				each_value = /*$wallets$*/ ctx[0];
				group_outros();
				each_blocks = update_keyed_each(
					each_blocks,
					dirty,
					get_key,
					1,
					ctx,
					each_value,
					each_1_lookup,
					div0,
					outro_and_destroy_block,
					create_each_block$1,
					null,
					get_each_context$1
				);
				check_outros();
			}

			if (/*device*/ ctx[10].type === 'desktop') if_block1.p(ctx, dirty);
			const walletappbadge0_changes = {};

			if (dirty & /*validAppChain*/ 16)
				walletappbadge0_changes.color = !(/*validAppChain*/ ctx[4])
					? '#FFAF00'
					: !(/*validAppChain*/ ctx[4].icon)
					? '#EFF1FC'
					: undefined;

			if (dirty & /*validAppChain, defaultChainStyles*/ 24)
				walletappbadge0_changes.customBackgroundColor = /*validAppChain*/ ctx[4]
					? /*validAppChain*/ ctx[4].color ||
					  /*defaultChainStyles*/ (ctx[3] && /*defaultChainStyles*/ ctx[3].color) ||
					  unrecognizedChainStyle.color
					: '#FFE7B3';

			if (dirty & /*validAppChain, defaultChainStyles*/ 24)
				walletappbadge0_changes.icon = /*validAppChain*/ ctx[4]
					? /*validAppChain*/ ctx[4].icon ||
					  /*defaultChainStyles*/ (ctx[3] && /*defaultChainStyles*/ ctx[3].icon) ||
					  unrecognizedChainStyle.icon
					: warningIcon;

			walletappbadge0.$set(walletappbadge0_changes);

			if (/*validAppChain*/ ctx[4]) {
				if (if_block2) {
					if (dirty & /*validAppChain*/ 16) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_3$1();
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div3, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (
				(!current || dirty & /*$_*/ 32) &&
				t5_value !==
					(t5_value =
						/*$_*/ ctx[5]('accountCenter.currentNetwork', {
							default: en.accountCenter.currentNetwork
						}) + '')
			)
				set_data(t5, t5_value);
			if (
				/*appMetadata*/ ctx[8] &&
				/*appMetadata*/ (ctx[8].gettingStartedGuide || /*appMetadata*/ ctx[8].explore)
			)
				if_block3.p(ctx, dirty);
			if (
				(!current || dirty & /*$_*/ 32) &&
				t15_value !==
					(t15_value =
						/*$_*/ ctx[5]('accountCenter.backToApp', { default: en.accountCenter.backToApp }) + '')
			)
				set_data(t15, t15_value);
			if (
				(!current || dirty & /*$_*/ 32) &&
				t17_value !==
					(t17_value =
						/*$_*/ ctx[5]('accountCenter.poweredBy', { default: en.accountCenter.poweredBy }) + '')
			)
				set_data(t17, t17_value);

			if (dirty & /*validAppChain, defaultChainStyles*/ 24) {
				toggle_class(
					div14,
					'background-blue',
					/*validAppChain*/ (ctx[4] && /*validAppChain*/ ctx[4].icon) ||
						/*defaultChainStyles*/ ctx[3]
				);
			}

			if (dirty & /*validAppChain*/ 16) {
				toggle_class(div14, 'background-yellow', !(/*validAppChain*/ ctx[4]));
			}

			if (dirty & /*validAppChain, defaultChainStyles*/ 24) {
				toggle_class(
					div14,
					'background-gray',
					/*validAppChain*/ ctx[4] && !(/*defaultChainStyles*/ ctx[3])
				);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(walletappbadge0.$$.fragment, local);
			transition_in(if_block2);
			transition_in(networkbadgeselector.$$.fragment, local);
			transition_in(walletappbadge1.$$.fragment, local);
			transition_in(successstatusicon.$$.fragment, local);

			if (!div16_intro) {
				add_render_callback(() => {
					div16_intro = create_in_transition(div16, fly, {
						delay: /*position*/ ctx[9].includes('top') ? 100 : 0,
						duration: 600,
						y: /*position*/ ctx[9].includes('top') ? 56 : -76,
						easing: quartOut,
						opacity: 0
					});

					div16_intro.start();
				});
			}

			current = true;
		},
		o(local) {
			transition_out(if_block0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(walletappbadge0.$$.fragment, local);
			transition_out(if_block2);
			transition_out(networkbadgeselector.$$.fragment, local);
			transition_out(walletappbadge1.$$.fragment, local);
			transition_out(successstatusicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			if (detaching) detach(div16);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block1) if_block1.d();
			destroy_component(walletappbadge0);
			if (if_block2) if_block2.d();
			destroy_component(networkbadgeselector);
			destroy_component(walletappbadge1);
			destroy_component(successstatusicon);
			if (if_block3) if_block3.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let primaryWallet;
	let connectedChain;
	let validAppChain;
	let defaultChainStyles;
	let $wallets$;
	let $_;
	component_subscribe($$self, wallets$, ($$value) => $$invalidate(0, ($wallets$ = $$value)));
	component_subscribe($$self, _, ($$value) => $$invalidate(5, ($_ = $$value)));

	function disconnectAllWallets() {
		$wallets$.forEach(({ label }) => disconnect({ label }));
	}

	const { chains: appChains } = state.get();
	const { appMetadata } = configuration;
	let disconnectConfirmModal = false;
	let hideWalletRowMenu;
	const { position } = state.get().accountCenter;
	const { device } = configuration;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	const func = () => $$invalidate(1, (disconnectConfirmModal = false));

	function walletrow_hideMenu_binding(value) {
		hideWalletRowMenu = value;
		$$invalidate(2, hideWalletRowMenu);
	}

	const click_handler_1 = () => connect$1();
	const click_handler_2 = () => $$invalidate(1, (disconnectConfirmModal = true));
	const click_handler_3 = () => updateAccountCenter({ expanded: false });

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$wallets$*/ 1) {
			$$invalidate(12, ([primaryWallet] = $wallets$), primaryWallet);
		}

		if ($$self.$$.dirty & /*primaryWallet*/ 4096) {
			$$invalidate(
				11,
				([connectedChain] = primaryWallet ? primaryWallet.chains : []),
				connectedChain
			);
		}

		if ($$self.$$.dirty & /*connectedChain*/ 2048) {
			$$invalidate(
				4,
				(validAppChain = appChains.find(({ id, namespace }) =>
					connectedChain
						? id === connectedChain.id && namespace === connectedChain.namespace
						: false
				))
			);
		}

		if ($$self.$$.dirty & /*connectedChain*/ 2048) {
			$$invalidate(
				3,
				(defaultChainStyles = getDefaultChainStyles(connectedChain && connectedChain.id))
			);
		}
	};

	return [
		$wallets$,
		disconnectConfirmModal,
		hideWalletRowMenu,
		defaultChainStyles,
		validAppChain,
		$_,
		disconnectAllWallets,
		appChains,
		appMetadata,
		position,
		device,
		connectedChain,
		primaryWallet,
		click_handler,
		func,
		walletrow_hideMenu_binding,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class Maximized extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, {}, add_css$9);
	}
}

/* src/views/account-center/Minimized.svelte generated by Svelte v3.48.0 */

function add_css$8(target) {
	append_styles(
		target,
		'svelte-w799ow',
		'.minimized.svelte-w799ow{background:var(--onboard-white, var(--white));border:1px solid var(--onboard-gray-100, var(--gray-100));width:100%;box-shadow:var(--onboard-shadow-3, var(--shadow-3));pointer-events:auto}.radius.svelte-w799ow{border-radius:var(--onboard-border-radius-3, var(--border-radius-3))}.padding-5.svelte-w799ow{padding:var(--onboard-spacing-5, var(--spacing-5))}.drop-shadow.svelte-w799ow{filter:drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2))}.address.svelte-w799ow{font-weight:700;line-height:var(--onboard-font-line-height-2, var(--font-line-height-2))}.balance.svelte-w799ow{font-weight:400;line-height:var(--onboard-font-line-height-2, var(--font-line-height-2));color:var(--onboard-gray-400, var(--gray-400))}.network.svelte-w799ow{margin-left:0.5rem}.chain-icon.svelte-w799ow{width:22px;height:22px;padding:4px;border-radius:25px;margin-right:4px}.container.svelte-w799ow{border:1px solid transparent;border-radius:16px;padding:1px;transition:border-color 250ms ease-in-out, backround 250ms ease-in-out;max-width:128px;cursor:default}.color-yellow.svelte-w799ow{color:var(--onboard-warning-500, var(--warning-500))}.color-white.svelte-w799ow{color:var(--onboard-primary-100, var(--primary-100))}'
	);
}

// (145:8) {#if firstAddressBalance}
function create_if_block$6(ctx) {
	let div;

	let t0_value =
		/*firstAddressBalance*/ (ctx[4].length > 8
			? /*firstAddressBalance*/ ctx[4].slice(0, 8)
			: /*firstAddressBalance*/ ctx[4]) + '';

	let t0;
	let t1;
	let t2;
	let div_intro;

	return {
		c() {
			div = element('div');
			t0 = text(t0_value);
			t1 = space();
			t2 = text(/*firstAddressAsset*/ ctx[1]);
			attr(div, 'class', 'balance svelte-w799ow');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			append(div, t2);
		},
		p(ctx, dirty) {
			if (
				dirty & /*firstAddressBalance*/ 16 &&
				t0_value !==
					(t0_value =
						/*firstAddressBalance*/ (ctx[4].length > 8
							? /*firstAddressBalance*/ ctx[4].slice(0, 8)
							: /*firstAddressBalance*/ ctx[4]) + '')
			)
				set_data(t0, t0_value);

			if (dirty & /*firstAddressAsset*/ 2) set_data(t2, /*firstAddressAsset*/ ctx[1]);
		},
		i(local) {
			if (!div_intro) {
				add_render_callback(() => {
					div_intro = create_in_transition(div, fade, {});
					div_intro.start();
				});
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$9(ctx) {
	let div12;
	let div11;
	let div6;
	let div3;
	let div0;
	let walletappbadge0;
	let t0;
	let div1;
	let walletappbadge1;
	let t1;
	let div2;
	let successstatusicon;
	let t2;
	let div5;
	let div4;

	let t3_value =
		/*ensName*/ (ctx[6] ? shortenEns(/*ensName*/ ctx[6]) : /*shortenedFirstAddress*/ ctx[5]) + '';

	let t3;
	let t4;
	let t5;
	let div10;
	let div9;
	let div8;
	let div7;

	let raw_value =
		/*validAppChain*/ (ctx[3]
			? /*validAppChain*/ ctx[3].icon ||
			  /*defaultChainStyles*/ (ctx[2] && /*defaultChainStyles*/ ctx[2].icon) ||
			  unrecognizedChainStyle.icon
			: warningIcon) + '';

	let div7_style_value;
	let t6;
	let networkselector;
	let div9_style_value;
	let div12_intro;
	let div12_outro;
	let current;
	let mounted;
	let dispose;

	walletappbadge0 = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'white',
			border: 'darkGreen',
			radius: 8,
			icon: /*appIcon*/ ctx[7]
		}
	});

	walletappbadge1 = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'green',
			border: 'darkGreen',
			radius: 8,
			icon: /*primaryWallet*/ ctx[0] ? /*primaryWallet*/ ctx[0].icon : ''
		}
	});

	successstatusicon = new SuccessStatusIcon({ props: { size: 14 } });
	let if_block = /*firstAddressBalance*/ ctx[4] && create_if_block$6(ctx);

	networkselector = new NetworkSelector({
		props: {
			chains: /*chains*/ ctx[8],
			color: '#33394B',
			selectIcon: caretIcon
		}
	});

	return {
		c() {
			div12 = element('div');
			div11 = element('div');
			div6 = element('div');
			div3 = element('div');
			div0 = element('div');
			create_component(walletappbadge0.$$.fragment);
			t0 = space();
			div1 = element('div');
			create_component(walletappbadge1.$$.fragment);
			t1 = space();
			div2 = element('div');
			create_component(successstatusicon.$$.fragment);
			t2 = space();
			div5 = element('div');
			div4 = element('div');
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			t5 = space();
			div10 = element('div');
			div9 = element('div');
			div8 = element('div');
			div7 = element('div');
			t6 = space();
			create_component(networkselector.$$.fragment);
			attr(div0, 'class', 'drop-shadow svelte-w799ow');
			set_style(div1, 'right', '0.5rem');
			attr(div1, 'class', 'drop-shadow relative svelte-w799ow');
			set_style(div2, 'right', '5px');
			set_style(div2, 'bottom', '-5px');
			attr(div2, 'class', 'drop-shadow absolute svelte-w799ow');
			attr(div3, 'class', 'flex items-centered relative');
			attr(div4, 'class', 'address svelte-w799ow');
			attr(div5, 'class', 'flex flex-column');
			set_style(div5, 'height', '40px');
			attr(div6, 'class', 'flex items-center w-100');
			attr(div7, 'class', 'chain-icon flex justify-center items-center svelte-w799ow');

			attr(
				div7,
				'style',
				(div7_style_value = `background-color: ${
					/*validAppChain*/ ctx[3]
						? /*validAppChain*/ ctx[3].color ||
						  /*defaultChainStyles*/ (ctx[2] && /*defaultChainStyles*/ ctx[2].color) ||
						  unrecognizedChainStyle.color
						: '#FFE7B3'
				};`)
			);

			toggle_class(div7, 'color-yellow', !(/*validAppChain*/ ctx[3]));
			toggle_class(
				div7,
				'color-white',
				/*validAppChain*/ ctx[3] && !(/*validAppChain*/ ctx[3].icon)
			);
			attr(div8, 'class', 'flex items-center');
			attr(div9, 'class', 'container shadow-1 flex items-center svelte-w799ow');
			attr(
				div9,
				'style',
				(div9_style_value = `border-color: ${
					/*validAppChain*/ ctx[3] ? '#D0D4F7' : '#FFAF00'
				}; background-color: ${/*validAppChain*/ ctx[3] ? '#EFF1FC' : '#FFEFCC'}`)
			);
			attr(div10, 'class', 'network svelte-w799ow');
			attr(div11, 'class', 'flex items-center justify-between');
			set_style(div11, 'padding', '0 4px');
			attr(div12, 'class', 'minimized pointer radius padding-5 svelte-w799ow');
		},
		m(target, anchor) {
			insert(target, div12, anchor);
			append(div12, div11);
			append(div11, div6);
			append(div6, div3);
			append(div3, div0);
			mount_component(walletappbadge0, div0, null);
			append(div3, t0);
			append(div3, div1);
			mount_component(walletappbadge1, div1, null);
			append(div3, t1);
			append(div3, div2);
			mount_component(successstatusicon, div2, null);
			append(div6, t2);
			append(div6, div5);
			append(div5, div4);
			append(div4, t3);
			append(div5, t4);
			if (if_block) if_block.m(div5, null);
			append(div11, t5);
			append(div11, div10);
			append(div10, div9);
			append(div9, div8);
			append(div8, div7);
			div7.innerHTML = raw_value;
			append(div8, t6);
			mount_component(networkselector, div8, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div9, 'click', stop_propagation(/*click_handler*/ ctx[13])),
					listen(div12, 'click', stop_propagation(/*maximize*/ ctx[9]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const walletappbadge1_changes = {};

			if (dirty & /*primaryWallet*/ 1)
				walletappbadge1_changes.icon = /*primaryWallet*/ ctx[0]
					? /*primaryWallet*/ ctx[0].icon
					: '';

			walletappbadge1.$set(walletappbadge1_changes);

			if (
				(!current || dirty & /*ensName, shortenedFirstAddress*/ 96) &&
				t3_value !==
					(t3_value =
						/*ensName*/ (ctx[6]
							? shortenEns(/*ensName*/ ctx[6])
							: /*shortenedFirstAddress*/ ctx[5]) + '')
			)
				set_data(t3, t3_value);

			if (/*firstAddressBalance*/ ctx[4]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*firstAddressBalance*/ 16) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$6(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div5, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (
				(!current || dirty & /*validAppChain, defaultChainStyles*/ 12) &&
				raw_value !==
					(raw_value =
						/*validAppChain*/ (ctx[3]
							? /*validAppChain*/ ctx[3].icon ||
							  /*defaultChainStyles*/ (ctx[2] && /*defaultChainStyles*/ ctx[2].icon) ||
							  unrecognizedChainStyle.icon
							: warningIcon) + '')
			)
				div7.innerHTML = raw_value;
			if (
				!current ||
				(dirty & /*validAppChain, defaultChainStyles*/ 12 &&
					div7_style_value !==
						(div7_style_value = `background-color: ${
							/*validAppChain*/ ctx[3]
								? /*validAppChain*/ ctx[3].color ||
								  /*defaultChainStyles*/ (ctx[2] && /*defaultChainStyles*/ ctx[2].color) ||
								  unrecognizedChainStyle.color
								: '#FFE7B3'
						};`))
			) {
				attr(div7, 'style', div7_style_value);
			}

			if (dirty & /*validAppChain*/ 8) {
				toggle_class(div7, 'color-yellow', !(/*validAppChain*/ ctx[3]));
			}

			if (dirty & /*validAppChain*/ 8) {
				toggle_class(
					div7,
					'color-white',
					/*validAppChain*/ ctx[3] && !(/*validAppChain*/ ctx[3].icon)
				);
			}

			if (
				!current ||
				(dirty & /*validAppChain*/ 8 &&
					div9_style_value !==
						(div9_style_value = `border-color: ${
							/*validAppChain*/ ctx[3] ? '#D0D4F7' : '#FFAF00'
						}; background-color: ${/*validAppChain*/ ctx[3] ? '#EFF1FC' : '#FFEFCC'}`))
			) {
				attr(div9, 'style', div9_style_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(walletappbadge0.$$.fragment, local);
			transition_in(walletappbadge1.$$.fragment, local);
			transition_in(successstatusicon.$$.fragment, local);
			transition_in(if_block);
			transition_in(networkselector.$$.fragment, local);

			add_render_callback(() => {
				if (div12_outro) div12_outro.end(1);
				div12_intro = create_in_transition(div12, fade, { duration: 250 });
				div12_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(walletappbadge0.$$.fragment, local);
			transition_out(walletappbadge1.$$.fragment, local);
			transition_out(successstatusicon.$$.fragment, local);
			transition_out(networkselector.$$.fragment, local);
			if (div12_intro) div12_intro.invalidate();
			div12_outro = create_out_transition(div12, fade, { duration: 100 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div12);
			destroy_component(walletappbadge0);
			destroy_component(walletappbadge1);
			destroy_component(successstatusicon);
			if (if_block) if_block.d();
			destroy_component(networkselector);
			if (detaching && div12_outro) div12_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let primaryWallet;
	let firstAccount;
	let ensName;
	let shortenedFirstAddress;
	let firstAddressAsset;
	let firstAddressBalance;
	let primaryChain;
	let validAppChain;
	let defaultChainStyles;
	let $wallets$;
	component_subscribe($$self, wallets$, ($$value) => $$invalidate(12, ($wallets$ = $$value)));
	const { appMetadata } = configuration;
	const appIcon = (appMetadata && appMetadata.icon) || questionIcon;
	const chains = state.get().chains;

	function maximize() {
		updateAccountCenter({ expanded: true });
	}

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$wallets$*/ 4096) {
			$$invalidate(0, ([primaryWallet] = $wallets$), primaryWallet);
		}

		if ($$self.$$.dirty & /*primaryWallet*/ 1) {
			$$invalidate(
				11,
				([firstAccount] = primaryWallet ? primaryWallet.accounts : []),
				firstAccount
			);
		}

		if ($$self.$$.dirty & /*firstAccount*/ 2048) {
			$$invalidate(
				6,
				(ensName = firstAccount && firstAccount.ens && shortenEns(firstAccount.ens.name))
			);
		}

		if ($$self.$$.dirty & /*firstAccount*/ 2048) {
			$$invalidate(
				5,
				(shortenedFirstAddress = firstAccount ? shortenAddress(firstAccount.address) : '')
			);
		}

		if ($$self.$$.dirty & /*firstAccount*/ 2048) {
			$$invalidate(
				1,
				([firstAddressAsset] =
					firstAccount && firstAccount.balance ? Object.keys(firstAccount.balance) : []),
				firstAddressAsset
			);
		}

		if ($$self.$$.dirty & /*firstAccount, firstAddressAsset*/ 2050) {
			$$invalidate(
				4,
				(firstAddressBalance =
					firstAccount && firstAccount.balance ? firstAccount.balance[firstAddressAsset] : null)
			);
		}

		if ($$self.$$.dirty & /*primaryWallet*/ 1) {
			$$invalidate(10, (primaryChain = primaryWallet && primaryWallet.chains[0]));
		}

		if ($$self.$$.dirty & /*primaryChain*/ 1024) {
			$$invalidate(
				3,
				(validAppChain = chains.find(({ id, namespace }) =>
					primaryChain ? id === primaryChain.id && namespace === primaryChain.namespace : false
				))
			);
		}

		if ($$self.$$.dirty & /*primaryChain*/ 1024) {
			$$invalidate(
				2,
				(defaultChainStyles = getDefaultChainStyles(primaryChain && primaryChain.id))
			);
		}
	};

	return [
		primaryWallet,
		firstAddressAsset,
		defaultChainStyles,
		validAppChain,
		firstAddressBalance,
		shortenedFirstAddress,
		ensName,
		appIcon,
		chains,
		maximize,
		primaryChain,
		firstAccount,
		$wallets$,
		click_handler
	];
}

class Minimized extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {}, add_css$8);
	}
}

/* src/views/account-center/Micro.svelte generated by Svelte v3.48.0 */

function add_css$7(target) {
	append_styles(
		target,
		'svelte-ervjv6',
		'.minimized.svelte-ervjv6{background:var(--onboard-white, var(--white));border:1px solid var(--onboard-gray-100, var(--gray-100));box-shadow:var(--onboard-shadow-3, var(--shadow-3));width:80px;pointer-events:auto}.radius.svelte-ervjv6{border-radius:var(--onboard-border-radius-3, var(--border-radius-3))}.drop-shadow.svelte-ervjv6{filter:drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2))}.inner-box-wrapper.svelte-ervjv6{display:flex;flex-flow:row nowrap;padding:12px}.wallet-square-wrapper.svelte-ervjv6{position:relative;margin-left:-8px}.check-icon-wrapper.svelte-ervjv6{position:absolute;right:-4px;bottom:-4px}'
	);
}

function create_fragment$8(ctx) {
	let div5;
	let div4;
	let div0;
	let walletappbadge0;
	let t0;
	let div3;
	let div1;
	let walletappbadge1;
	let t1;
	let div2;
	let successstatusicon;
	let current;
	let mounted;
	let dispose;

	walletappbadge0 = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'white',
			border: 'darkGreen',
			radius: 8,
			icon: /*appIcon*/ ctx[1]
		}
	});

	walletappbadge1 = new WalletAppBadge({
		props: {
			size: 32,
			padding: 4,
			background: 'green',
			border: 'darkGreen',
			radius: 8,
			icon: /*primaryWallet*/ ctx[0] ? /*primaryWallet*/ ctx[0].icon : ''
		}
	});

	successstatusicon = new SuccessStatusIcon({ props: { size: 14 } });

	return {
		c() {
			div5 = element('div');
			div4 = element('div');
			div0 = element('div');
			create_component(walletappbadge0.$$.fragment);
			t0 = space();
			div3 = element('div');
			div1 = element('div');
			create_component(walletappbadge1.$$.fragment);
			t1 = space();
			div2 = element('div');
			create_component(successstatusicon.$$.fragment);
			attr(div0, 'class', 'drop-shadow svelte-ervjv6');
			attr(div1, 'class', 'drop-shadow svelte-ervjv6');
			attr(div2, 'class', 'check-icon-wrapper drop-shadow svelte-ervjv6');
			attr(div3, 'class', 'wallet-square-wrapper svelte-ervjv6');
			attr(div4, 'class', 'inner-box-wrapper svelte-ervjv6');
			attr(div5, 'class', 'minimized pointer radius svelte-ervjv6');
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div4);
			append(div4, div0);
			mount_component(walletappbadge0, div0, null);
			append(div4, t0);
			append(div4, div3);
			append(div3, div1);
			mount_component(walletappbadge1, div1, null);
			append(div3, t1);
			append(div3, div2);
			mount_component(successstatusicon, div2, null);
			current = true;

			if (!mounted) {
				dispose = listen(div5, 'click', stop_propagation(/*maximize*/ ctx[2]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const walletappbadge1_changes = {};

			if (dirty & /*primaryWallet*/ 1)
				walletappbadge1_changes.icon = /*primaryWallet*/ ctx[0]
					? /*primaryWallet*/ ctx[0].icon
					: '';

			walletappbadge1.$set(walletappbadge1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(walletappbadge0.$$.fragment, local);
			transition_in(walletappbadge1.$$.fragment, local);
			transition_in(successstatusicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(walletappbadge0.$$.fragment, local);
			transition_out(walletappbadge1.$$.fragment, local);
			transition_out(successstatusicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div5);
			destroy_component(walletappbadge0);
			destroy_component(walletappbadge1);
			destroy_component(successstatusicon);
			mounted = false;
			dispose();
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let primaryWallet;
	let $wallets$;
	component_subscribe($$self, wallets$, ($$value) => $$invalidate(3, ($wallets$ = $$value)));
	const { appMetadata } = configuration;
	const appIcon = (appMetadata && appMetadata.icon) || questionIcon;

	function maximize() {
		updateAccountCenter({ expanded: true });
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$wallets$*/ 8) {
			$$invalidate(0, ([primaryWallet] = $wallets$), primaryWallet);
		}
	};

	return [primaryWallet, appIcon, maximize, $wallets$];
}

class Micro extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {}, add_css$7);
	}
}

/* src/views/account-center/Index.svelte generated by Svelte v3.48.0 */

function create_else_block$1(ctx) {
	let maximized;
	let current;
	maximized = new Maximized({});

	return {
		c() {
			create_component(maximized.$$.fragment);
		},
		m(target, anchor) {
			mount_component(maximized, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(maximized.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(maximized.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(maximized, detaching);
		}
	};
}

// (20:49)
function create_if_block_1$3(ctx) {
	let micro;
	let current;
	micro = new Micro({});

	return {
		c() {
			create_component(micro.$$.fragment);
		},
		m(target, anchor) {
			mount_component(micro, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(micro.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(micro.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(micro, detaching);
		}
	};
}

// (17:0) {#if !settings.expanded && !settings.minimal}
function create_if_block$5(ctx) {
	let minimized;
	let current;
	minimized = new Minimized({});

	return {
		c() {
			create_component(minimized.$$.fragment);
		},
		m(target, anchor) {
			mount_component(minimized, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(minimized.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(minimized.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(minimized, detaching);
		}
	};
}

function create_fragment$7(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$5, create_if_block_1$3, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!(/*settings*/ ctx[0].expanded) && !(/*settings*/ ctx[0].minimal)) return 0;
		if (!(/*settings*/ ctx[0].expanded) && /*settings*/ ctx[0].minimal) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen(window, 'click', /*minimize*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] =
						if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
			mounted = false;
			dispose();
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let { settings } = $$props;
	onDestroy(minimize);

	function minimize() {
		if (settings.expanded) {
			updateAccountCenter({ expanded: false });
		}
	}

	$$self.$$set = ($$props) => {
		if ('settings' in $$props) $$invalidate(0, (settings = $$props.settings));
	};

	return [settings, minimize];
}

class Index$2 extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, { settings: 0 });
	}
}

function flip(node, { from, to }, params = {}) {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const [ox, oy] = style.transformOrigin.split(' ').map(parseFloat);
	const dx = from.left + (from.width * ox) / to.width - (to.left + ox);
	const dy = from.top + (from.height * oy) / to.height - (to.top + oy);
	const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
	return {
		delay,
		duration: is_function(duration) ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
		easing,
		css: (t, u) => {
			const x = u * dx;
			const y = u * dy;
			const sx = t + (u * from.width) / to.width;
			const sy = t + (u * from.height) / to.height;
			return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
		}
	};
}

/* src/views/notify/ChainBadge.svelte generated by Svelte v3.48.0 */

function add_css$6(target) {
	append_styles(
		target,
		'svelte-13cuwwo',
		'div.svelte-13cuwwo{box-sizing:content-box}.border.svelte-13cuwwo{border:2px solid;border-radius:120px;overflow:hidden}'
	);
}

function create_fragment$6(ctx) {
	let div;
	let div_style_value;

	return {
		c() {
			div = element('div');
			attr(div, 'class', 'border svelte-13cuwwo');

			attr(
				div,
				'style',
				(div_style_value = `
    width: ${/*size*/ ctx[2] - /*padding*/ ctx[3] * 2}px; 
    height: ${/*size*/ ctx[2] - /*padding*/ ctx[3] * 2}px; 
    border-color: var(${/*borderColorVar*/ ctx[1]}); 
    padding: ${/*padding*/ ctx[3]}px; 
    background-color: ${/*background*/ ctx[4]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
  `)
			);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div.innerHTML = /*icon*/ ctx[0];
		},
		p(ctx, [dirty]) {
			if (dirty & /*icon*/ 1) div.innerHTML = /*icon*/ ctx[0];
			if (
				dirty & /*size, padding, borderColorVar, background*/ 30 &&
				div_style_value !==
					(div_style_value = `
    width: ${/*size*/ ctx[2] - /*padding*/ ctx[3] * 2}px; 
    height: ${/*size*/ ctx[2] - /*padding*/ ctx[3] * 2}px; 
    border-color: var(${/*borderColorVar*/ ctx[1]}); 
    padding: ${/*padding*/ ctx[3]}px; 
    background-color: ${/*background*/ ctx[4]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
  `)
			) {
				attr(div, 'style', div_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let { icon } = $$props;
	let { borderColorVar } = $$props;
	let { size } = $$props;
	let { padding = 0 } = $$props;
	let { background = 'transparent' } = $$props;

	$$self.$$set = ($$props) => {
		if ('icon' in $$props) $$invalidate(0, (icon = $$props.icon));
		if ('borderColorVar' in $$props) $$invalidate(1, (borderColorVar = $$props.borderColorVar));
		if ('size' in $$props) $$invalidate(2, (size = $$props.size));
		if ('padding' in $$props) $$invalidate(3, (padding = $$props.padding));
		if ('background' in $$props) $$invalidate(4, (background = $$props.background));
	};

	return [icon, borderColorVar, size, padding, background];
}

class ChainBadge extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$6,
			create_fragment$6,
			safe_not_equal,
			{
				icon: 0,
				borderColorVar: 1,
				size: 2,
				padding: 3,
				background: 4
			},
			add_css$6
		);
	}
}

/* src/views/notify/StatusIconBadge.svelte generated by Svelte v3.48.0 */

function add_css$5(target) {
	append_styles(
		target,
		'svelte-jvic9v',
		"div.notification-icons-wrapper.svelte-jvic9v{height:32px;width:32px}.border.svelte-jvic9v{border-radius:8px}div.notification-icon.svelte-jvic9v{padding:6px}div.pending-icon.svelte-jvic9v{animation:svelte-jvic9v-blink 2s ease-in infinite;height:100%;width:100%;padding:7px}@keyframes svelte-jvic9v-blink{from,to{opacity:1}50%{opacity:0.2}}div.border-action.svelte-jvic9v{height:32px;min-width:32px;border-radius:8px;overflow:hidden;will-change:transform}div.border-action.svelte-jvic9v:before{content:'';background-image:conic-gradient(#b1b7f2 20deg, #6370e5 120deg);height:140%;width:140%;position:absolute;left:-25%;top:-25%;animation:svelte-jvic9v-rotate 2s infinite linear}div.chain-icon-container.svelte-jvic9v{left:18px;top:18px}@keyframes svelte-jvic9v-rotate{100%{transform:rotate(-360deg)}}"
	);
}

// (63:0) {#if notification.type}
function create_if_block$4(ctx) {
	let div2;
	let t0;
	let div1;
	let div0;
	let raw_value = defaultNotifyEventStyles[/*notification*/ ctx[1].type]['eventIcon'] + '';
	let div0_class_value;
	let div1_style_value;
	let t1;
	let show_if = !(/*notification*/ ctx[1].id.includes('customNotification'));
	let current;
	let if_block0 = /*notification*/ ctx[1].type === 'pending' && create_if_block_2$1();
	let if_block1 = show_if && create_if_block_1$2(ctx);

	return {
		c() {
			div2 = element('div');
			if (if_block0) if_block0.c();
			t0 = space();
			div1 = element('div');
			div0 = element('div');
			t1 = space();
			if (if_block1) if_block1.c();

			attr(
				div0,
				'class',
				(div0_class_value =
					'' +
					(null_to_empty(
						`notification-icon flex items-center justify-center ${
							/*notification*/ ctx[1].type === 'pending' ? 'pending-icon' : ''
						}`
					) +
						' svelte-jvic9v'))
			);

			attr(
				div1,
				'class',
				'flex items-center justify-center border relative notification-icons-wrapper svelte-jvic9v'
			);

			attr(
				div1,
				'style',
				(div1_style_value = `background:${
					defaultNotifyEventStyles[/*notification*/ ctx[1].type]['backgroundColor']
				}; color: ${defaultNotifyEventStyles[/*notification*/ ctx[1].type]['iconColor'] || ''}; ${
					/*notification*/ ctx[1].type === 'pending'
						? 'height: 28px; width: 28px; margin: 2px;'
						: `border: 2px solid ${
								defaultNotifyEventStyles[/*notification*/ ctx[1].type]['borderColor']
						  }`
				}; `)
			);

			attr(div2, 'class', 'relative');
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			if (if_block0) if_block0.m(div2, null);
			append(div2, t0);
			append(div2, div1);
			append(div1, div0);
			div0.innerHTML = raw_value;
			append(div2, t1);
			if (if_block1) if_block1.m(div2, null);
			current = true;
		},
		p(ctx, dirty) {
			if (/*notification*/ ctx[1].type === 'pending') {
				if (if_block0);
				else {
					if_block0 = create_if_block_2$1();
					if_block0.c();
					if_block0.m(div2, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (
				(!current || dirty & /*notification*/ 2) &&
				raw_value !==
					(raw_value = defaultNotifyEventStyles[/*notification*/ ctx[1].type]['eventIcon'] + '')
			)
				div0.innerHTML = raw_value;
			if (
				!current ||
				(dirty & /*notification*/ 2 &&
					div0_class_value !==
						(div0_class_value =
							'' +
							(null_to_empty(
								`notification-icon flex items-center justify-center ${
									/*notification*/ ctx[1].type === 'pending' ? 'pending-icon' : ''
								}`
							) +
								' svelte-jvic9v')))
			) {
				attr(div0, 'class', div0_class_value);
			}

			if (
				!current ||
				(dirty & /*notification*/ 2 &&
					div1_style_value !==
						(div1_style_value = `background:${
							defaultNotifyEventStyles[/*notification*/ ctx[1].type]['backgroundColor']
						}; color: ${
							defaultNotifyEventStyles[/*notification*/ ctx[1].type]['iconColor'] || ''
						}; ${
							/*notification*/ ctx[1].type === 'pending'
								? 'height: 28px; width: 28px; margin: 2px;'
								: `border: 2px solid ${
										defaultNotifyEventStyles[/*notification*/ ctx[1].type]['borderColor']
								  }`
						}; `))
			) {
				attr(div1, 'style', div1_style_value);
			}

			if (dirty & /*notification*/ 2)
				show_if = !(/*notification*/ ctx[1].id.includes('customNotification'));

			if (show_if) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*notification*/ 2) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div2, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (65:4) {#if notification.type === 'pending'}
function create_if_block_2$1(ctx) {
	let div;

	return {
		c() {
			div = element('div');
			attr(div, 'class', 'border-action absolute svelte-jvic9v');
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (91:4) {#if !notification.id.includes('customNotification')}
function create_if_block_1$2(ctx) {
	let div;
	let chainbadge;
	let current;

	chainbadge = new ChainBadge({
		props: {
			icon: /*chainStyles*/ ctx[0].icon,
			size: 16,
			background: /*chainStyles*/ ctx[0].color,
			borderColorVar: '--onboard-gray-600, var(--gray-600)',
			padding: 3
		}
	});

	return {
		c() {
			div = element('div');
			create_component(chainbadge.$$.fragment);
			attr(div, 'class', 'absolute chain-icon-container svelte-jvic9v');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(chainbadge, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const chainbadge_changes = {};
			if (dirty & /*chainStyles*/ 1) chainbadge_changes.icon = /*chainStyles*/ ctx[0].icon;
			if (dirty & /*chainStyles*/ 1) chainbadge_changes.background = /*chainStyles*/ ctx[0].color;
			chainbadge.$set(chainbadge_changes);
		},
		i(local) {
			if (current) return;
			transition_in(chainbadge.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(chainbadge.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(chainbadge);
		}
	};
}

function create_fragment$5(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*notification*/ ctx[1].type && create_if_block$4(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*notification*/ ctx[1].type) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*notification*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { chainStyles = unrecognizedChainStyle } = $$props;
	let { notification } = $$props;

	$$self.$$set = ($$props) => {
		if ('chainStyles' in $$props) $$invalidate(0, (chainStyles = $$props.chainStyles));
		if ('notification' in $$props) $$invalidate(1, (notification = $$props.notification));
	};

	return [chainStyles, notification];
}

class StatusIconBadge extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$5,
			create_fragment$5,
			safe_not_equal,
			{ chainStyles: 0, notification: 1 },
			add_css$5
		);
	}
}

/* src/views/notify/Timer.svelte generated by Svelte v3.48.0 */

function add_css$4(target) {
	append_styles(
		target,
		'svelte-1qgnr32',
		'div.svelte-1qgnr32{display:flex;justify-content:center;font-size:inherit;font-family:inherit;margin:0 1.5rem 0 0.75rem}span.svelte-1qgnr32{font-family:inherit;display:flex;align-items:center;margin:0 2px}.time.svelte-1qgnr32{color:var(\n      --notify-onboard-gray-300,\n      var(--onboard-gray-300, var(--gray-300))\n    );margin-left:4px}'
	);
}

// (46:2) {#if startTime}
function create_if_block$3(ctx) {
	let t0;
	let span;
	let t1_value = /*timeString*/ ctx[2](/*currentTime*/ ctx[1] - /*startTime*/ ctx[0]) + '';
	let t1;
	let t2;

	return {
		c() {
			t0 = text('-\n    ');
			span = element('span');
			t1 = text(t1_value);
			t2 = text('\n    ago');
			attr(span, 'class', 'svelte-1qgnr32');
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, span, anchor);
			append(span, t1);
			insert(target, t2, anchor);
		},
		p(ctx, dirty) {
			if (
				dirty & /*currentTime, startTime*/ 3 &&
				t1_value !==
					(t1_value = /*timeString*/ ctx[2](/*currentTime*/ ctx[1] - /*startTime*/ ctx[0]) + '')
			)
				set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(span);
			if (detaching) detach(t2);
		}
	};
}

function create_fragment$4(ctx) {
	let div;
	let if_block = /*startTime*/ ctx[0] && create_if_block$3(ctx);

	return {
		c() {
			div = element('div');
			if (if_block) if_block.c();
			attr(div, 'class', 'time svelte-1qgnr32');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (/*startTime*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let $formatter;
	let $locale;
	component_subscribe($$self, _, ($$value) => $$invalidate(3, ($formatter = $$value)));
	component_subscribe($$self, locale$1, ($$value) => $$invalidate(4, ($locale = $$value)));
	let { startTime } = $$props;

	function timeString(time) {
		const seconds = Math.floor(time / 1000);
		const formattedSeconds = seconds < 0 ? 0 : seconds;

		return formattedSeconds >= 60
			? `${Math.floor(formattedSeconds / 60).toLocaleString($locale)} ${$formatter(
					'notify.time.minutes'
			  )}`
			: `${formattedSeconds.toLocaleString($locale)} ${$formatter('notify.time.seconds')}`;
	}

	let currentTime = Date.now();

	const intervalId = setInterval(() => {
		$$invalidate(1, (currentTime = Date.now()));
	}, 1000);

	onDestroy(() => {
		clearInterval(intervalId);
	});

	$$self.$$set = ($$props) => {
		if ('startTime' in $$props) $$invalidate(0, (startTime = $$props.startTime));
	};

	return [startTime, currentTime, timeString];
}

class Timer extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{ startTime: 0 },
			add_css$4
		);
	}
}

/* src/views/notify/NotificationContent.svelte generated by Svelte v3.48.0 */

function add_css$3(target) {
	append_styles(
		target,
		'svelte-g7vehc',
		'div.notify-transaction-data.svelte-g7vehc{font-size:var(\n      --notify-onboard-font-size-6,\n      var(--onboard-font-size-6, var(--font-size-6))\n    );font-family:inherit;margin:0px 20px 0px 8px;justify-content:center}.hash-time.svelte-g7vehc{display:inline-flex;margin-top:4px;font-size:var(\n      --notify-onboard-font-size-7,\n      var(--onboard-font-size-7, var(--font-size-7))\n    );line-height:var(\n      --notify-onboard-font-line-height-4,\n      var(--onboard-font-line-height-4, var(--font-line-height-4))\n    )}.address-hash.svelte-g7vehc{color:var(\n      --notify-onboard-primary-200,\n      var(--onboard-primary-200, var(--primary-200))\n    )}a.address-hash.svelte-g7vehc{color:var(\n      --notify-onboard-primary-400,\n      var(--onboard-primary-400, var(--primary-400))\n    )}a.svelte-g7vehc{display:flex;text-decoration:none;color:inherit}.transaction-status.svelte-g7vehc{color:var(\n      --notify-onboard-primary-100,\n      var(--onboard-primary-100, var(--primary-100))\n    );line-height:var(\n      --notify-onboard-font-size-5,\n      var(--onboard-font-size-5, var(--font-size-5))\n    );font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}'
	);
}

// (74:2) {#if notification.id && !notification.id.includes('customNotification')}
function create_if_block$2(ctx) {
	let span;
	let t;
	let timer;
	let current;

	function select_block_type(ctx, dirty) {
		if (/*notification*/ ctx[0].link) return create_if_block_1$1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	timer = new Timer({
		props: {
			startTime: /*notification*/ ctx[0].startTime
		}
	});

	return {
		c() {
			span = element('span');
			if_block.c();
			t = space();
			create_component(timer.$$.fragment);
			attr(span, 'class', 'hash-time svelte-g7vehc');
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if_block.m(span, null);
			append(span, t);
			mount_component(timer, span, null);
			current = true;
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(span, t);
				}
			}

			const timer_changes = {};
			if (dirty & /*notification*/ 1) timer_changes.startTime = /*notification*/ ctx[0].startTime;
			timer.$set(timer_changes);
		},
		i(local) {
			if (current) return;
			transition_in(timer.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(timer.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if_block.d();
			destroy_component(timer);
		}
	};
}

// (85:6) {:else}
function create_else_block(ctx) {
	let div;
	let t_value = shortenAddress(/*notification*/ ctx[0].id) + '';
	let t;

	return {
		c() {
			div = element('div');
			t = text(t_value);
			attr(div, 'class', 'address-hash svelte-g7vehc');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*notification*/ 1 &&
				t_value !== (t_value = shortenAddress(/*notification*/ ctx[0].id) + '')
			)
				set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (76:6) {#if notification.link}
function create_if_block_1$1(ctx) {
	let a;
	let t_value = shortenAddress(/*notification*/ ctx[0].id) + '';
	let t;
	let a_href_value;

	return {
		c() {
			a = element('a');
			t = text(t_value);
			attr(a, 'class', 'address-hash svelte-g7vehc');
			attr(a, 'href', (a_href_value = /*notification*/ ctx[0].link));
			attr(a, 'target', '_blank');
			attr(a, 'rel', 'noreferrer noopener');
		},
		m(target, anchor) {
			insert(target, a, anchor);
			append(a, t);
		},
		p(ctx, dirty) {
			if (
				dirty & /*notification*/ 1 &&
				t_value !== (t_value = shortenAddress(/*notification*/ ctx[0].id) + '')
			)
				set_data(t, t_value);

			if (
				dirty & /*notification*/ 1 &&
				a_href_value !== (a_href_value = /*notification*/ ctx[0].link)
			) {
				attr(a, 'href', a_href_value);
			}
		},
		d(detaching) {
			if (detaching) detach(a);
		}
	};
}

function create_fragment$3(ctx) {
	let div;
	let span;
	let t0_value = /*notification*/ ctx[0].message + '';
	let t0;
	let t1;
	let show_if =
		/*notification*/ ctx[0].id && !(/*notification*/ ctx[0].id.includes('customNotification'));
	let current;
	let if_block = show_if && create_if_block$2(ctx);

	return {
		c() {
			div = element('div');
			span = element('span');
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			attr(span, 'class', 'transaction-status svelte-g7vehc');
			attr(div, 'class', 'flex flex-column notify-transaction-data svelte-g7vehc');
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span);
			append(span, t0);
			append(div, t1);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (
				(!current || dirty & /*notification*/ 1) &&
				t0_value !== (t0_value = /*notification*/ ctx[0].message + '')
			)
				set_data(t0, t0_value);
			if (dirty & /*notification*/ 1)
				show_if =
					/*notification*/ ctx[0].id &&
					!(/*notification*/ ctx[0].id.includes('customNotification'));

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*notification*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { notification } = $$props;

	$$self.$$set = ($$props) => {
		if ('notification' in $$props) $$invalidate(0, (notification = $$props.notification));
	};

	return [notification];
}

class NotificationContent extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$3,
			create_fragment$3,
			safe_not_equal,
			{ notification: 0 },
			add_css$3
		);
	}
}

var closeIcon = `
<svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z" fill="currentColor"/>
</svg>
`;

/* src/views/notify/Notification.svelte generated by Svelte v3.48.0 */

function add_css$2(target) {
	append_styles(
		target,
		'svelte-j3jub',
		'.bn-notify-notification.svelte-j3jub.svelte-j3jub{font-family:inherit;transition:background 300ms ease-in-out, color 300ms ease-in-out;pointer-events:all;backdrop-filter:blur(5px);width:100%;min-height:56px;background:var(\n      --notify-onboard-gray-600,\n      var(--onboard-gray-600, var(--gray-600))\n    );padding:0.75rem;border-radius:var(\n      --notify-onboard-border-radius,\n      var(--onboard-border-radius-4, var(--border-radius-4))\n    );display:flex;position:relative}.bn-notify-notification.svelte-j3jub:hover>div.notify-close-btn-desktop.svelte-j3jub{visibility:visible;opacity:1}div.notify-close-btn.svelte-j3jub.svelte-j3jub{margin-left:auto;margin-bottom:auto;height:24px;width:24px;position:absolute;top:8px;right:8px;justify-content:center;align-items:center}div.notify-close-btn-desktop.svelte-j3jub.svelte-j3jub{visibility:hidden;transition:visibility 0.15s linear, opacity 0.15s linear;opacity:0}.notify-close-btn.svelte-j3jub .close-icon.svelte-j3jub{width:20px;margin:auto}.notify-close-btn.svelte-j3jub>.close-icon.svelte-j3jub{color:var(\n      --notify-onboard-gray-300,\n      var(--onboard-gray-300, var(--gray-300))\n    )}.notify-close-btn.svelte-j3jub:hover>.close-icon.svelte-j3jub{color:var(\n      --notify-onboard-gray-100,\n      var(--onboard-gray-100, var(--gray-100))\n    )}.transaction-status.svelte-j3jub.svelte-j3jub{color:var(\n      --notify-onboard-primary-100,\n      var(--onboard-primary-100, var(--primary-100))\n    );line-height:14px}'
	);
}

function create_fragment$2(ctx) {
	let div2;
	let statusiconbadge;
	let t0;
	let notificationcontent;
	let t1;
	let div1;
	let div0;
	let div2_class_value;
	let current;
	let mounted;
	let dispose;

	statusiconbadge = new StatusIconBadge({
		props: {
			notification: /*notification*/ ctx[0],
			chainStyles: chainStyles[networkToChainId[/*notification*/ ctx[0].network]]
		}
	});

	notificationcontent = new NotificationContent({
		props: { notification: /*notification*/ ctx[0] }
	});

	return {
		c() {
			div2 = element('div');
			create_component(statusiconbadge.$$.fragment);
			t0 = space();
			create_component(notificationcontent.$$.fragment);
			t1 = space();
			div1 = element('div');
			div0 = element('div');
			attr(div0, 'class', 'flex items-center close-icon svelte-j3jub');
			attr(
				div1,
				'class',
				'notify-close-btn notify-close-btn-' +
					/*device*/ ctx[2].type +
					' pointer flex' +
					' svelte-j3jub'
			);
			attr(
				div2,
				'class',
				(div2_class_value =
					'bn-notify-notification bn-notify-notification-' +
					/*notification*/ ctx[0].type +
					'}' +
					' svelte-j3jub')
			);
			toggle_class(div2, 'bn-notify-clickable', /*notification*/ ctx[0].onClick);
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			mount_component(statusiconbadge, div2, null);
			append(div2, t0);
			mount_component(notificationcontent, div2, null);
			append(div2, t1);
			append(div2, div1);
			append(div1, div0);
			div0.innerHTML = closeIcon;
			current = true;

			if (!mounted) {
				dispose = [
					listen(div1, 'click', stop_propagation(/*click_handler*/ ctx[3])),
					listen(div2, 'click', /*click_handler_1*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const statusiconbadge_changes = {};
			if (dirty & /*notification*/ 1)
				statusiconbadge_changes.notification = /*notification*/ ctx[0];
			if (dirty & /*notification*/ 1)
				statusiconbadge_changes.chainStyles =
					chainStyles[networkToChainId[/*notification*/ ctx[0].network]];
			statusiconbadge.$set(statusiconbadge_changes);
			const notificationcontent_changes = {};
			if (dirty & /*notification*/ 1)
				notificationcontent_changes.notification = /*notification*/ ctx[0];
			notificationcontent.$set(notificationcontent_changes);

			if (
				!current ||
				(dirty & /*notification*/ 1 &&
					div2_class_value !==
						(div2_class_value =
							'bn-notify-notification bn-notify-notification-' +
							/*notification*/ ctx[0].type +
							'}' +
							' svelte-j3jub'))
			) {
				attr(div2, 'class', div2_class_value);
			}

			if (dirty & /*notification, notification*/ 1) {
				toggle_class(div2, 'bn-notify-clickable', /*notification*/ ctx[0].onClick);
			}
		},
		i(local) {
			if (current) return;
			transition_in(statusiconbadge.$$.fragment, local);
			transition_in(notificationcontent.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(statusiconbadge.$$.fragment, local);
			transition_out(notificationcontent.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_component(statusiconbadge);
			destroy_component(notificationcontent);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	const { device } = configuration;
	let { notification } = $$props;
	let { updateParentOnRemove } = $$props;
	let timeoutId;

	onMount(() => {
		if (notification.autoDismiss) {
			timeoutId = setTimeout(() => {
				removeNotification(notification.id);
			}, notification.autoDismiss);
		}
	});

	onDestroy(() => {
		clearTimeout(timeoutId);
	});

	const click_handler = () => {
		removeNotification(notification.id);
		updateParentOnRemove();
	};

	const click_handler_1 = (e) => notification.onClick && notification.onClick(e);

	$$self.$$set = ($$props) => {
		if ('notification' in $$props) $$invalidate(0, (notification = $$props.notification));
		if ('updateParentOnRemove' in $$props)
			$$invalidate(1, (updateParentOnRemove = $$props.updateParentOnRemove));
	};

	return [notification, updateParentOnRemove, device, click_handler, click_handler_1];
}

class Notification extends SvelteComponent {
	constructor(options) {
		super();
		init$1(
			this,
			options,
			instance$2,
			create_fragment$2,
			safe_not_equal,
			{ notification: 0, updateParentOnRemove: 1 },
			add_css$2
		);
	}
}

/* src/views/notify/Index.svelte generated by Svelte v3.48.0 */

function add_css$1(target) {
	append_styles(
		target,
		'svelte-14inrvn',
		'ul.svelte-14inrvn{padding-left:0;display:flex;flex-flow:column nowrap;font-size:var(\n      --notify-onboard-font-size-5,\n      var(--onboard-font-size-5, var(--font-size-5))\n    );list-style-type:none;overflow:visible;scrollbar-width:none;box-sizing:border-box;z-index:300;font-family:var(\n      --notify-onboard-font-family-normal,\n      var(--onboard-font-family-normal, var(--font-family-normal))\n    );margin:8px 0;pointer-events:all}.y-scroll.svelte-14inrvn{overflow-y:scroll}.y-visible.svelte-14inrvn{overflow-y:visible}li.notification-list-top.svelte-14inrvn:not(:first-child){margin-top:8px}li.notification-list-bottom.svelte-14inrvn:not(:first-child){margin-bottom:8px}ul.bn-notify-bottomLeft.svelte-14inrvn,ul.bn-notify-bottomRight.svelte-14inrvn{flex-direction:column-reverse}@media only screen and (max-width: 450px){ul.svelte-14inrvn{width:100%}}.bn-notify-clickable:hover{cursor:pointer}.svelte-14inrvn::-webkit-scrollbar{display:none}'
	);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (105:0) {#if notifications.length}
function create_if_block$1(ctx) {
	let ul;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let ul_class_value;
	let ul_style_value;
	let current;
	let each_value = /*notifications*/ ctx[2];
	const get_key = (ctx) => /*notification*/ ctx[12].key;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, (each_blocks[i] = create_each_block(key, child_ctx)));
	}

	return {
		c() {
			ul = element('ul');

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(
				ul,
				'class',
				(ul_class_value =
					'bn-notify-' + /*position*/ ctx[0] + ' ' + /*overflowY*/ ctx[5] + ' svelte-14inrvn')
			);

			attr(
				ul,
				'style',
				(ul_style_value = `${
					/*position*/ ctx[0].includes('top') ? 'justify-content:flex-start;' : ''
				}; max-height: calc(100vh - ${
					/*$accountCenter$*/ ctx[6].expanded
						? '412px'
						: /*sharedContainer*/ ctx[1] && /*device*/ ctx[7].type !== 'mobile'
						? '82px'
						: !(/*sharedContainer*/ ctx[1]) && /*device*/ ctx[7].type === 'mobile'
						? '108px'
						: '24px'
				})`)
			);
		},
		m(target, anchor) {
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*position, cubicOut, notifications, updateScrollYOnRemove*/ 517) {
				each_value = /*notifications*/ ctx[2];
				group_outros();
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				each_blocks = update_keyed_each(
					each_blocks,
					dirty,
					get_key,
					1,
					ctx,
					each_value,
					each_1_lookup,
					ul,
					fix_and_outro_and_destroy_block,
					create_each_block,
					null,
					get_each_context
				);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
				check_outros();
			}

			if (
				!current ||
				(dirty & /*position, overflowY*/ 33 &&
					ul_class_value !==
						(ul_class_value =
							'bn-notify-' + /*position*/ ctx[0] + ' ' + /*overflowY*/ ctx[5] + ' svelte-14inrvn'))
			) {
				attr(ul, 'class', ul_class_value);
			}

			if (
				!current ||
				(dirty & /*position, $accountCenter$, sharedContainer*/ 67 &&
					ul_style_value !==
						(ul_style_value = `${
							/*position*/ ctx[0].includes('top') ? 'justify-content:flex-start;' : ''
						}; max-height: calc(100vh - ${
							/*$accountCenter$*/ ctx[6].expanded
								? '412px'
								: /*sharedContainer*/ ctx[1] && /*device*/ ctx[7].type !== 'mobile'
								? '82px'
								: !(/*sharedContainer*/ ctx[1]) && /*device*/ ctx[7].type === 'mobile'
								? '108px'
								: '24px'
						})`))
			) {
				attr(ul, 'style', ul_style_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

// (120:4) {#each notifications as notification (notification.key)}
function create_each_block(key_1, ctx) {
	let li;
	let notification;
	let t;
	let li_class_value;
	let li_intro;
	let li_outro;
	let rect;
	let stop_animation = noop;
	let current;
	let mounted;
	let dispose;

	notification = new Notification({
		props: {
			notification: /*notification*/ ctx[12],
			updateParentOnRemove: /*updateScrollYOnRemove*/ ctx[9]
		}
	});

	return {
		key: key_1,
		first: null,
		c() {
			li = element('li');
			create_component(notification.$$.fragment);
			t = space();

			attr(
				li,
				'class',
				(li_class_value =
					'' +
					(null_to_empty(
						`bn-notify-li-${/*position*/ ctx[0]} ${
							/*position*/ ctx[0].includes('top')
								? 'notification-list-top'
								: 'notification-list-bottom'
						}`
					) +
						' svelte-14inrvn'))
			);

			this.first = li;
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(notification, li, null);
			append(li, t);
			current = true;

			if (!mounted) {
				dispose = listen(li, 'click', stop_propagation(/*click_handler*/ ctx[10]));
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const notification_changes = {};
			if (dirty & /*notifications*/ 4) notification_changes.notification = /*notification*/ ctx[12];
			notification.$set(notification_changes);

			if (
				!current ||
				(dirty & /*position*/ 1 &&
					li_class_value !==
						(li_class_value =
							'' +
							(null_to_empty(
								`bn-notify-li-${/*position*/ ctx[0]} ${
									/*position*/ ctx[0].includes('top')
										? 'notification-list-top'
										: 'notification-list-bottom'
								}`
							) +
								' svelte-14inrvn')))
			) {
				attr(li, 'class', li_class_value);
			}
		},
		r() {
			rect = li.getBoundingClientRect();
		},
		f() {
			fix_position(li);
			stop_animation();
			add_transform(li, rect);
		},
		a() {
			stop_animation();
			stop_animation = create_animation(li, rect, flip, { duration: 500 });
		},
		i(local) {
			if (current) return;
			transition_in(notification.$$.fragment, local);

			add_render_callback(() => {
				if (li_outro) li_outro.end(1);

				li_intro = create_in_transition(li, fly, {
					duration: 1200,
					delay: 300,
					x: /*x*/ ctx[3],
					y: /*y*/ ctx[4],
					easing: elasticOut
				});

				li_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(notification.$$.fragment, local);
			if (li_intro) li_intro.invalidate();
			li_outro = create_out_transition(li, fade, { duration: 300, easing: cubicOut });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(notification);
			if (detaching && li_outro) li_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*notifications*/ ctx[2].length && create_if_block$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*notifications*/ ctx[2].length) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*notifications*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function elasticOut(t) {
	return Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -35.0 * t) + 1.0;
}

function instance$1($$self, $$props, $$invalidate) {
	let $accountCenter$;
	const { device } = configuration;
	const accountCenter$ = state
		.select('accountCenter')
		.pipe(startWith(state.get().accountCenter), shareReplay(1));
	component_subscribe($$self, accountCenter$, (value) =>
		$$invalidate(6, ($accountCenter$ = value))
	);
	let { position } = $$props;
	let { sharedContainer } = $$props;
	let { notifications } = $$props;
	let x;
	let y;
	x = 0;
	y = 0;
	let overflowY = 'y-scroll';

	const updateScrollYOnRemove = () => {
		if (overflowY !== 'y-visible') {
			$$invalidate(5, (overflowY = 'y-visible'));
		}

		delay(function () {
			$$invalidate(5, (overflowY = 'y-scroll'));
		}, 1000);
	};

	const delay = (function () {
		let timer = null;

		return (callback, ms) => {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = ($$props) => {
		if ('position' in $$props) $$invalidate(0, (position = $$props.position));
		if ('sharedContainer' in $$props) $$invalidate(1, (sharedContainer = $$props.sharedContainer));
		if ('notifications' in $$props) $$invalidate(2, (notifications = $$props.notifications));
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*position*/ 1) {
			if (position.includes('top')) {
				$$invalidate(4, (y = -50));
			} else {
				$$invalidate(4, (y = 50));
			}
		}
	};

	return [
		position,
		sharedContainer,
		notifications,
		x,
		y,
		overflowY,
		$accountCenter$,
		device,
		accountCenter$,
		updateScrollYOnRemove,
		click_handler
	];
}

class Index$1 extends SvelteComponent {
	constructor(options) {
		super();

		init$1(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				position: 0,
				sharedContainer: 1,
				notifications: 2
			},
			add_css$1
		);
	}
}

/* src/views/Index.svelte generated by Svelte v3.48.0 */

function add_css(target) {
	append_styles(
		target,
		'svelte-fo6a2w',
		".flex{display:flex}.inline-flex{display:inline-flex}.flex-column{flex-direction:column}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.justify-between{justify-content:space-between}.justify-around{justify-content:space-around}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.pointer{cursor:pointer}.shadow-1{box-shadow:var(--onboard-shadow-1, var(--shadow-1))}.w-100{width:100%}*{box-sizing:border-box}input{background:var(--onboard-white, var(--white))}input{width:100%;padding:0.5rem 1rem;outline:2px solid var(--onboard-gray-200, var(--gray-200));border:none;border-radius:8px;font-size:1rem;line-height:1.5;color:var(--onboard-gray-600, var(--gray-600));transition:all 200ms ease-in-out}input[type='checkbox']{-webkit-appearance:none;width:auto;background:var(--onboard-white, var(--white));outline:1px solid var(--onboard-gray-300, var(--gray-300));border:none;padding:0.5em;border-radius:3px;display:flex;justify-content:center;align-items:center;position:relative;cursor:pointer}input[type='checkbox']:hover{border-color:var(\n      --onboard-checkbox-background,\n      var(--onboard-primary-500, var(--primary-500))\n    )}input[type='checkbox']:checked{background:var(\n      --onboard-checkbox-background,\n      var(--onboard-primary-500, var(--primary-500))\n    );border-color:var(\n      --onboard-checkbox-background,\n      var(--onboard-primary-500, var(--primary-500))\n    );color:var(--onboard-checkbox-color, var(--onboard-white, var(--white)))}input[type='checkbox']:checked:after{content:url(\"data:image/svg+xml,%3Csvg width='0.885em' height='0.6em' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 6L5 11L14 2L12.59 0.58L5 8.17L1.41 4.59L0 6Z' fill='white'/%3E%3C/svg%3E\");font-size:12px;position:absolute;color:var(--onboard-checkbox-color, var(--onboard-white, var(--white)))}input:hover{border-color:var(\n      --onboard-checkbox-color,\n      var(--onboard-white, var(--white))\n    )}input:focus{border-color:var(--onboard-primary-500, var(--primary-500));box-shadow:0 0 1px 1px\n      var(\n        --onboard-checkbox-background,\n        var(--onboard-primary-500, var(--primary-500))\n      );box-shadow:0 0 0 1px -moz-mac-focusring}input:disabled, textarea:disabled, select:disabled{background:var(--gray-100)}input::-moz-focus-inner{outline:0;padding:0;margin-top:-2px;margin-bottom:-2px}a{color:var(\n      --onboard-link-color,\n      var(--onboard-primary-500, var(--primary-500))\n    );text-decoration:none}a:hover{text-decoration:underline}button{display:flex;align-items:center;justify-content:center;padding:calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);border-radius:24px;cursor:pointer;font:inherit;border:none;transition:background-color 150ms ease-in-out, color 150ms ease-in-out}.onboard-button-primary{background:var(--onboard-white, var(--white));padding:calc(var(--onboard-spacing-5, var(--spacing-5)) - 1px)\n      calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);color:var(--onboard-gray-500, var(--gray-500));font-size:var(--onboard-font-size-6, var(--font-size-6));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3));border:1px solid var(--onboard-gray-500, var(--gray-500));font-weight:700}.button-neutral-solid{width:100%;border-radius:8px;background:var(--onboard-gray-500, var(--gray-500));color:var(--onboard-white, var(--white));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3))}.button-neutral-solid-b{width:100%;background:var(--onboard-gray-100, var(--gray-100));color:var(--onboard-gray-500, var(--gray-500));line-height:var(--onboard-font-line-height-3, var(--font-line-height-3))}button.rounded{border-radius:24px}.button-neutral-solid:hover{background:var(--onboard-gray-700, var(--gray-700))}.button-neutral-solid-b:hover{background:var(--onboard-gray-200, var(--gray-200))}.button-neutral-solid:active{color:var(--onboard-gray-300, var(--gray-300))}.button-neutral-solid-b:active{color:var(--onboard-gray-600, var(--gray-600));background:var(--onboard-gray-300, var(--gray-300))}.container.svelte-fo6a2w{padding:16px;font-family:var(--onboard-font-family-normal, var(--font-family-normal));width:100%;pointer-events:none;touch-action:none}.z-indexed.svelte-fo6a2w{z-index:var(--account-center-z-index)}@media all and (min-width: 428px){.container.svelte-fo6a2w{max-width:348px}}"
	);
}

// (308:0) {#if $connectWallet$.inProgress}
function create_if_block_8(ctx) {
	let connect;
	let current;

	connect = new Index$3({
		props: {
			autoSelect: /*$connectWallet$*/ ctx[8].autoSelect
		}
	});

	return {
		c() {
			create_component(connect.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connect, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const connect_changes = {};
			if (dirty & /*$connectWallet$*/ 256)
				connect_changes.autoSelect = /*$connectWallet$*/ ctx[8].autoSelect;
			connect.$set(connect_changes);
		},
		i(local) {
			if (current) return;
			transition_in(connect.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connect.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connect, detaching);
		}
	};
}

// (312:0) {#if $connectWallet$.actionRequired}
function create_if_block_7(ctx) {
	let actionrequired;
	let current;

	actionrequired = new ActionRequired({
		props: {
			wallet: /*$connectWallet$*/ ctx[8].actionRequired
		}
	});

	return {
		c() {
			create_component(actionrequired.$$.fragment);
		},
		m(target, anchor) {
			mount_component(actionrequired, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const actionrequired_changes = {};
			if (dirty & /*$connectWallet$*/ 256)
				actionrequired_changes.wallet = /*$connectWallet$*/ ctx[8].actionRequired;
			actionrequired.$set(actionrequired_changes);
		},
		i(local) {
			if (current) return;
			transition_in(actionrequired.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(actionrequired.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(actionrequired, detaching);
		}
	};
}

// (316:0) {#if $switchChainModal$}
function create_if_block_6(ctx) {
	let switchchain;
	let current;
	switchchain = new SwitchChain({});

	return {
		c() {
			create_component(switchchain.$$.fragment);
		},
		m(target, anchor) {
			mount_component(switchchain, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(switchchain.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(switchchain.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(switchchain, detaching);
		}
	};
}

// (320:0) {#if displayAccountCenterNotifySameContainer}
function create_if_block_3(ctx) {
	let div1;
	let show_if_1 =
		/*$notify$*/ ctx[3].position.includes('bottom') &&
		/*$accountCenter$*/ ctx[2].position.includes('bottom') &&
		/*samePositionOrMobile*/ ctx[7];
	let t0;
	let div0;
	let accountcenter;
	let div0_style_value;
	let t1;
	let show_if =
		/*$notify$*/ ctx[3].position.includes('top') &&
		/*$accountCenter$*/ ctx[2].position.includes('top') &&
		/*samePositionOrMobile*/ ctx[7];
	let div1_style_value;
	let current;
	let if_block0 = show_if_1 && create_if_block_5(ctx);

	accountcenter = new Index$2({
		props: { settings: /*$accountCenter$*/ ctx[2] }
	});

	let if_block1 = show_if && create_if_block_4(ctx);

	return {
		c() {
			div1 = element('div');
			if (if_block0) if_block0.c();
			t0 = space();
			div0 = element('div');
			create_component(accountcenter.$$.fragment);
			t1 = space();
			if (if_block1) if_block1.c();

			attr(
				div0,
				'style',
				(div0_style_value =
					!(/*$accountCenter$*/ ctx[2].expanded) &&
					/*$accountCenter$*/ ctx[2].minimal &&
					/*$accountCenter$*/ ctx[2].position.includes('Right')
						? 'margin-left: auto'
						: !(/*$accountCenter$*/ ctx[2].expanded) &&
						  /*$accountCenter$*/ ctx[2].minimal &&
						  /*$accountCenter$*/ ctx[2].position.includes('Left')
						? 'margin-right: auto'
						: '')
			);

			attr(div1, 'class', 'container flex flex-column fixed z-indexed svelte-fo6a2w');

			attr(
				div1,
				'style',
				(div1_style_value =
					'' +
					/*positioningDefaults*/ (ctx[15][/*$accountCenter$*/ ctx[2].position] +
						'; ' +
						/*device*/ (ctx[11].type === 'mobile' &&
						/*$accountCenter$*/ ctx[2].position.includes('top')
							? 'padding-bottom: 0;'
							: /*device*/ ctx[11].type === 'mobile' &&
							  /*$accountCenter$*/ ctx[2].position.includes('bottom')
							? 'padding-top:0;'
							: '') +
						''))
			);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t0);
			append(div1, div0);
			mount_component(accountcenter, div0, null);
			append(div1, t1);
			if (if_block1) if_block1.m(div1, null);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*$notify$, $accountCenter$, samePositionOrMobile*/ 140)
				show_if_1 =
					/*$notify$*/ ctx[3].position.includes('bottom') &&
					/*$accountCenter$*/ ctx[2].position.includes('bottom') &&
					/*samePositionOrMobile*/ ctx[7];

			if (show_if_1) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$notify$, $accountCenter$, samePositionOrMobile*/ 140) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div1, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const accountcenter_changes = {};
			if (dirty & /*$accountCenter$*/ 4)
				accountcenter_changes.settings = /*$accountCenter$*/ ctx[2];
			accountcenter.$set(accountcenter_changes);

			if (
				!current ||
				(dirty & /*$accountCenter$*/ 4 &&
					div0_style_value !==
						(div0_style_value =
							!(/*$accountCenter$*/ ctx[2].expanded) &&
							/*$accountCenter$*/ ctx[2].minimal &&
							/*$accountCenter$*/ ctx[2].position.includes('Right')
								? 'margin-left: auto'
								: !(/*$accountCenter$*/ ctx[2].expanded) &&
								  /*$accountCenter$*/ ctx[2].minimal &&
								  /*$accountCenter$*/ ctx[2].position.includes('Left')
								? 'margin-right: auto'
								: ''))
			) {
				attr(div0, 'style', div0_style_value);
			}

			if (dirty & /*$notify$, $accountCenter$, samePositionOrMobile*/ 140)
				show_if =
					/*$notify$*/ ctx[3].position.includes('top') &&
					/*$accountCenter$*/ ctx[2].position.includes('top') &&
					/*samePositionOrMobile*/ ctx[7];

			if (show_if) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*$notify$, $accountCenter$, samePositionOrMobile*/ 140) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (
				!current ||
				(dirty & /*$accountCenter$*/ 4 &&
					div1_style_value !==
						(div1_style_value =
							'' +
							/*positioningDefaults*/ (ctx[15][/*$accountCenter$*/ ctx[2].position] +
								'; ' +
								/*device*/ (ctx[11].type === 'mobile' &&
								/*$accountCenter$*/ ctx[2].position.includes('top')
									? 'padding-bottom: 0;'
									: /*device*/ ctx[11].type === 'mobile' &&
									  /*$accountCenter$*/ ctx[2].position.includes('bottom')
									? 'padding-top:0;'
									: '') +
								'')))
			) {
				attr(div1, 'style', div1_style_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(accountcenter.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(accountcenter.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block0) if_block0.d();
			destroy_component(accountcenter);
			if (if_block1) if_block1.d();
		}
	};
}

// (330:4) {#if $notify$.position.includes('bottom') && $accountCenter$.position.includes('bottom') && samePositionOrMobile}
function create_if_block_5(ctx) {
	let notify;
	let current;

	notify = new Index$1({
		props: {
			notifications: /*$notifications$*/ ctx[10],
			position: /*$notify$*/ ctx[3].position,
			sharedContainer: /*sharedContainer*/ ctx[0]
		}
	});

	return {
		c() {
			create_component(notify.$$.fragment);
		},
		m(target, anchor) {
			mount_component(notify, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const notify_changes = {};
			if (dirty & /*$notifications$*/ 1024)
				notify_changes.notifications = /*$notifications$*/ ctx[10];
			if (dirty & /*$notify$*/ 8) notify_changes.position = /*$notify$*/ ctx[3].position;
			if (dirty & /*sharedContainer*/ 1)
				notify_changes.sharedContainer = /*sharedContainer*/ ctx[0];
			notify.$set(notify_changes);
		},
		i(local) {
			if (current) return;
			transition_in(notify.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(notify.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(notify, detaching);
		}
	};
}

// (350:4) {#if $notify$.position.includes('top') && $accountCenter$.position.includes('top') && samePositionOrMobile}
function create_if_block_4(ctx) {
	let notify;
	let current;

	notify = new Index$1({
		props: {
			notifications: /*$notifications$*/ ctx[10],
			position: /*$notify$*/ ctx[3].position,
			sharedContainer: /*sharedContainer*/ ctx[0]
		}
	});

	return {
		c() {
			create_component(notify.$$.fragment);
		},
		m(target, anchor) {
			mount_component(notify, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const notify_changes = {};
			if (dirty & /*$notifications$*/ 1024)
				notify_changes.notifications = /*$notifications$*/ ctx[10];
			if (dirty & /*$notify$*/ 8) notify_changes.position = /*$notify$*/ ctx[3].position;
			if (dirty & /*sharedContainer*/ 1)
				notify_changes.sharedContainer = /*sharedContainer*/ ctx[0];
			notify.$set(notify_changes);
		},
		i(local) {
			if (current) return;
			transition_in(notify.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(notify.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(notify, detaching);
		}
	};
}

// (359:0) {#if displayAccountCenterSeparate}
function create_if_block_1(ctx) {
	let div1;
	let div0;
	let div0_style_value;
	let div1_style_value;
	let current;
	let if_block =
		/*$accountCenter$*/ ctx[2].enabled && /*$wallets$*/ ctx[1].length && create_if_block_2(ctx);

	return {
		c() {
			div1 = element('div');
			div0 = element('div');
			if (if_block) if_block.c();

			attr(
				div0,
				'style',
				(div0_style_value =
					!(/*$accountCenter$*/ ctx[2].expanded) &&
					/*$accountCenter$*/ ctx[2].minimal &&
					/*$accountCenter$*/ ctx[2].position.includes('Right')
						? 'margin-left: auto'
						: !(/*$accountCenter$*/ ctx[2].expanded) &&
						  /*$accountCenter$*/ ctx[2].minimal &&
						  /*$accountCenter$*/ ctx[2].position.includes('Left')
						? 'margin-right: auto'
						: '')
			);

			attr(div1, 'class', 'container flex flex-column fixed z-indexed svelte-fo6a2w');

			attr(
				div1,
				'style',
				(div1_style_value =
					'' +
					/*positioningDefaults*/ (ctx[15][/*$accountCenter$*/ ctx[2].position] +
						'; ' +
						/*device*/ (ctx[11].type === 'mobile' &&
						/*$accountCenter$*/ ctx[2].position.includes('top')
							? 'padding-bottom: 0;'
							: /*device*/ ctx[11].type === 'mobile' &&
							  /*$accountCenter$*/ ctx[2].position.includes('bottom')
							? 'padding-top:0;'
							: '') +
						''))
			);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if (if_block) if_block.m(div0, null);
			current = true;
		},
		p(ctx, dirty) {
			if (/*$accountCenter$*/ ctx[2].enabled && /*$wallets$*/ ctx[1].length) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$accountCenter$, $wallets$*/ 6) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div0, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (
				!current ||
				(dirty & /*$accountCenter$*/ 4 &&
					div0_style_value !==
						(div0_style_value =
							!(/*$accountCenter$*/ ctx[2].expanded) &&
							/*$accountCenter$*/ ctx[2].minimal &&
							/*$accountCenter$*/ ctx[2].position.includes('Right')
								? 'margin-left: auto'
								: !(/*$accountCenter$*/ ctx[2].expanded) &&
								  /*$accountCenter$*/ ctx[2].minimal &&
								  /*$accountCenter$*/ ctx[2].position.includes('Left')
								? 'margin-right: auto'
								: ''))
			) {
				attr(div0, 'style', div0_style_value);
			}

			if (
				!current ||
				(dirty & /*$accountCenter$*/ 4 &&
					div1_style_value !==
						(div1_style_value =
							'' +
							/*positioningDefaults*/ (ctx[15][/*$accountCenter$*/ ctx[2].position] +
								'; ' +
								/*device*/ (ctx[11].type === 'mobile' &&
								/*$accountCenter$*/ ctx[2].position.includes('top')
									? 'padding-bottom: 0;'
									: /*device*/ ctx[11].type === 'mobile' &&
									  /*$accountCenter$*/ ctx[2].position.includes('bottom')
									? 'padding-top:0;'
									: '') +
								'')))
			) {
				attr(div1, 'style', div1_style_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
		}
	};
}

// (380:6) {#if $accountCenter$.enabled && $wallets$.length}
function create_if_block_2(ctx) {
	let accountcenter;
	let current;

	accountcenter = new Index$2({
		props: { settings: /*$accountCenter$*/ ctx[2] }
	});

	return {
		c() {
			create_component(accountcenter.$$.fragment);
		},
		m(target, anchor) {
			mount_component(accountcenter, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const accountcenter_changes = {};
			if (dirty & /*$accountCenter$*/ 4)
				accountcenter_changes.settings = /*$accountCenter$*/ ctx[2];
			accountcenter.$set(accountcenter_changes);
		},
		i(local) {
			if (current) return;
			transition_in(accountcenter.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(accountcenter.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(accountcenter, detaching);
		}
	};
}

// (386:0) {#if displayNotifySeparate}
function create_if_block(ctx) {
	let div;
	let notify;
	let div_style_value;
	let current;

	notify = new Index$1({
		props: {
			notifications: /*$notifications$*/ ctx[10],
			position: /*$notify$*/ ctx[3].position,
			sharedContainer: /*sharedContainer*/ ctx[0]
		}
	});

	return {
		c() {
			div = element('div');
			create_component(notify.$$.fragment);
			attr(div, 'class', 'container flex flex-column fixed z-indexed svelte-fo6a2w');

			attr(
				div,
				'style',
				(div_style_value =
					'' +
					/*positioningDefaults*/ (ctx[15][/*$notify$*/ ctx[3].position] +
						'; ' +
						/*device*/ (ctx[11].type === 'mobile' && /*$notify$*/ ctx[3].position.includes('top')
							? 'padding-bottom: 0;'
							: /*device*/ ctx[11].type === 'mobile' &&
							  /*$notify$*/ ctx[3].position.includes('bottom')
							? 'padding-top:0;'
							: '') +
						''))
			);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(notify, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const notify_changes = {};
			if (dirty & /*$notifications$*/ 1024)
				notify_changes.notifications = /*$notifications$*/ ctx[10];
			if (dirty & /*$notify$*/ 8) notify_changes.position = /*$notify$*/ ctx[3].position;
			if (dirty & /*sharedContainer*/ 1)
				notify_changes.sharedContainer = /*sharedContainer*/ ctx[0];
			notify.$set(notify_changes);

			if (
				!current ||
				(dirty & /*$notify$*/ 8 &&
					div_style_value !==
						(div_style_value =
							'' +
							/*positioningDefaults*/ (ctx[15][/*$notify$*/ ctx[3].position] +
								'; ' +
								/*device*/ (ctx[11].type === 'mobile' &&
								/*$notify$*/ ctx[3].position.includes('top')
									? 'padding-bottom: 0;'
									: /*device*/ ctx[11].type === 'mobile' &&
									  /*$notify$*/ ctx[3].position.includes('bottom')
									? 'padding-top:0;'
									: '') +
								'')))
			) {
				attr(div, 'style', div_style_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(notify.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(notify.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(notify);
		}
	};
}

function create_fragment(ctx) {
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let if_block5_anchor;
	let current;
	let if_block0 = /*$connectWallet$*/ ctx[8].inProgress && create_if_block_8(ctx);
	let if_block1 = /*$connectWallet$*/ ctx[8].actionRequired && create_if_block_7(ctx);
	let if_block2 = /*$switchChainModal$*/ ctx[9] && create_if_block_6();
	let if_block3 = /*displayAccountCenterNotifySameContainer*/ ctx[4] && create_if_block_3(ctx);
	let if_block4 = /*displayAccountCenterSeparate*/ ctx[5] && create_if_block_1(ctx);
	let if_block5 = /*displayNotifySeparate*/ ctx[6] && create_if_block(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			t2 = space();
			if (if_block3) if_block3.c();
			t3 = space();
			if (if_block4) if_block4.c();
			t4 = space();
			if (if_block5) if_block5.c();
			if_block5_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t1, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, t2, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert(target, t3, anchor);
			if (if_block4) if_block4.m(target, anchor);
			insert(target, t4, anchor);
			if (if_block5) if_block5.m(target, anchor);
			insert(target, if_block5_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*$connectWallet$*/ ctx[8].inProgress) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$connectWallet$*/ 256) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_8(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*$connectWallet$*/ ctx[8].actionRequired) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*$connectWallet$*/ 256) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_7(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t1.parentNode, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*$switchChainModal$*/ ctx[9]) {
				if (if_block2) {
					if (dirty & /*$switchChainModal$*/ 512) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_6();
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(t2.parentNode, t2);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*displayAccountCenterNotifySameContainer*/ ctx[4]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*displayAccountCenterNotifySameContainer*/ 16) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_3(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(t3.parentNode, t3);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			if (/*displayAccountCenterSeparate*/ ctx[5]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty & /*displayAccountCenterSeparate*/ 32) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block_1(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(t4.parentNode, t4);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}

			if (/*displayNotifySeparate*/ ctx[6]) {
				if (if_block5) {
					if_block5.p(ctx, dirty);

					if (dirty & /*displayNotifySeparate*/ 64) {
						transition_in(if_block5, 1);
					}
				} else {
					if_block5 = create_if_block(ctx);
					if_block5.c();
					transition_in(if_block5, 1);
					if_block5.m(if_block5_anchor.parentNode, if_block5_anchor);
				}
			} else if (if_block5) {
				group_outros();

				transition_out(if_block5, 1, 1, () => {
					if_block5 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(if_block3);
			transition_in(if_block4);
			transition_in(if_block5);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(if_block3);
			transition_out(if_block4);
			transition_out(if_block5);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(t1);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach(t2);
			if (if_block3) if_block3.d(detaching);
			if (detaching) detach(t3);
			if (if_block4) if_block4.d(detaching);
			if (detaching) detach(t4);
			if (if_block5) if_block5.d(detaching);
			if (detaching) detach(if_block5_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let sharedContainer;
	let samePositionOrMobile;
	let sharedMobileContainerCheck;
	let separateMobileContainerCheck;
	let displayNotifySeparate;
	let displayAccountCenterSeparate;
	let displayAccountCenterNotifySameContainer;
	let $wallets$;
	let $accountCenter$;
	let $notify$;
	let $connectWallet$;
	let $switchChainModal$;
	let $notifications$;
	component_subscribe($$self, wallets$, ($$value) => $$invalidate(1, ($wallets$ = $$value)));
	component_subscribe($$self, connectWallet$, ($$value) =>
		$$invalidate(8, ($connectWallet$ = $$value))
	);
	component_subscribe($$self, switchChainModal$, ($$value) =>
		$$invalidate(9, ($switchChainModal$ = $$value))
	);
	const { device } = configuration;
	const accountCenter$ = state
		.select('accountCenter')
		.pipe(startWith(state.get().accountCenter), shareReplay(1));
	component_subscribe($$self, accountCenter$, (value) =>
		$$invalidate(2, ($accountCenter$ = value))
	);
	const notify$ = state.select('notify').pipe(startWith(state.get().notify), shareReplay(1));
	component_subscribe($$self, notify$, (value) => $$invalidate(3, ($notify$ = value)));
	const notifications$ = state.select('notifications').pipe(startWith(state.get().notifications));
	component_subscribe($$self, notifications$, (value) =>
		$$invalidate(10, ($notifications$ = value))
	);

	const positioningDefaults = {
		topLeft: 'top: 0; left: 0;',
		topRight: 'top: 0; right: 0;',
		bottomRight: 'bottom: 0; right: 0;',
		bottomLeft: 'bottom: 0; left: 0;'
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$accountCenter$, $notify$*/ 12) {
			$$invalidate(
				0,
				(sharedContainer =
					$accountCenter$.enabled &&
					$notify$.enabled &&
					$notify$.position === $accountCenter$.position)
			);
		}

		if ($$self.$$.dirty & /*$accountCenter$, $notify$*/ 12) {
			$$invalidate(
				7,
				(samePositionOrMobile =
					device.type === 'mobile' || $accountCenter$.position === $notify$.position)
			);
		}

		if ($$self.$$.dirty & /*$notify$, $accountCenter$*/ 12) {
			$$invalidate(
				16,
				(sharedMobileContainerCheck =
					device.type === 'mobile' &&
					(($notify$.position.includes('bottom') && $accountCenter$.position.includes('bottom')) ||
						($notify$.position.includes('top') && $accountCenter$.position.includes('top'))))
			);
		}

		if ($$self.$$.dirty & /*$notify$, $accountCenter$*/ 12) {
			$$invalidate(
				17,
				(separateMobileContainerCheck =
					device.type === 'mobile' &&
					(($notify$.position.includes('top') && $accountCenter$.position.includes('bottom')) ||
						($notify$.position.includes('bottom') && $accountCenter$.position.includes('top'))))
			);
		}

		if (
			$$self.$$.dirty &
			/*$notify$, $accountCenter$, separateMobileContainerCheck, $wallets$*/ 131086
		) {
			$$invalidate(
				6,
				(displayNotifySeparate =
					$notify$.enabled &&
					(!$accountCenter$.enabled ||
						($notify$.position !== $accountCenter$.position && device.type !== 'mobile') ||
						separateMobileContainerCheck) &&
					$wallets$.length)
			);
		}

		if (
			$$self.$$.dirty &
			/*$accountCenter$, $notify$, separateMobileContainerCheck, $wallets$*/ 131086
		) {
			$$invalidate(
				5,
				(displayAccountCenterSeparate =
					$accountCenter$.enabled &&
					(!$notify$.enabled ||
						($notify$.position !== $accountCenter$.position && device.type !== 'mobile') ||
						separateMobileContainerCheck) &&
					$wallets$.length)
			);
		}

		if (
			$$self.$$.dirty &
			/*$notify$, $accountCenter$, $wallets$, sharedContainer, sharedMobileContainerCheck*/ 65551
		) {
			$$invalidate(
				4,
				(displayAccountCenterNotifySameContainer =
					$notify$.enabled &&
					$accountCenter$.enabled &&
					$wallets$.length &&
					(sharedContainer || sharedMobileContainerCheck))
			);
		}
	};

	return [
		sharedContainer,
		$wallets$,
		$accountCenter$,
		$notify$,
		displayAccountCenterNotifySameContainer,
		displayAccountCenterSeparate,
		displayNotifySeparate,
		samePositionOrMobile,
		$connectWallet$,
		$switchChainModal$,
		$notifications$,
		device,
		accountCenter$,
		notify$,
		notifications$,
		positioningDefaults,
		sharedMobileContainerCheck,
		separateMobileContainerCheck
	];
}

class Index extends SvelteComponent {
	constructor(options) {
		super();
		init$1(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
	}
}

async function updateBalances(addresses) {
	const { wallets, chains } = state.get();
	const updatedWallets = await Promise.all(
		wallets.map(async (wallet) => {
			const chain = chains.find(({ id }) => id === wallet.chains[0].id);
			const updatedAccounts = await Promise.all(
				wallet.accounts.map(async (account) => {
					// if no provided addresses, we want to update all balances
					// otherwise check if address is in addresses array
					if (!addresses || addresses.includes(account.address)) {
						const updatedBalance = await getBalance(account.address, chain);
						return { ...account, balance: updatedBalance };
					}
					return account;
				})
			);
			return { ...wallet, accounts: updatedAccounts };
		})
	);
	updateAllWallets(updatedWallets);
}

const API = {
	connectWallet: connect$1,
	disconnectWallet: disconnect,
	setChain,
	state: {
		get: state.get,
		select: state.select,
		actions: {
			setWalletModules,
			setLocale,
			updateNotify,
			customNotification,
			updateBalances,
			updateAccountCenter
		}
	}
};
function init(options) {
	if (typeof window === 'undefined') return API;
	if (options) {
		const error = validateInitOptions(options);
		if (error) {
			throw error;
		}
	}
	const { wallets, chains, appMetadata = null, i18n, accountCenter, apiKey, notify } = options;
	initialize(i18n);
	addChains(chains);
	const { device, svelteInstance } = configuration;
	// update accountCenter
	if (typeof accountCenter !== 'undefined') {
		let accountCenterUpdate;
		if (device.type === 'mobile' && accountCenter.mobile) {
			accountCenterUpdate = {
				...APP_INITIAL_STATE.accountCenter,
				...accountCenter.mobile
			};
		} else if (accountCenter.desktop) {
			accountCenterUpdate = {
				...APP_INITIAL_STATE.accountCenter,
				...accountCenter.desktop
			};
		}
		updateAccountCenter(accountCenterUpdate);
	}
	// update notify
	if (typeof notify !== 'undefined') {
		if ('desktop' in notify || 'mobile' in notify) {
			const error = validateNotifyOptions(notify);
			if (error) {
				throw error;
			}
			if (
				(!notify.desktop || (notify.desktop && !notify.desktop.position)) &&
				accountCenter &&
				accountCenter.desktop &&
				accountCenter.desktop.position
			) {
				notify.desktop.position = accountCenter.desktop.position;
			}
			if (
				(!notify.mobile || (notify.mobile && !notify.mobile.position)) &&
				accountCenter &&
				accountCenter.mobile &&
				accountCenter.mobile.position
			) {
				notify.mobile.position = accountCenter.mobile.position;
			}
			let notifyUpdate;
			if (device.type === 'mobile' && notify.mobile) {
				notifyUpdate = {
					...APP_INITIAL_STATE.notify,
					...notify.mobile
				};
			} else if (notify.desktop) {
				notifyUpdate = {
					...APP_INITIAL_STATE.notify,
					...notify.desktop
				};
			}
			if (!apiKey || !notifyUpdate.enabled) {
				notifyUpdate.enabled = false;
			}
			updateNotify(notifyUpdate);
		} else {
			const error = validateNotify(notify);
			if (error) {
				throw error;
			}
			const notifyUpdate = {
				...APP_INITIAL_STATE.notify,
				...notify
			};
			if (!apiKey || !notifyUpdate.enabled) {
				notifyUpdate.enabled = false;
			}
			console.log(notifyUpdate);
			updateNotify(notifyUpdate);
		}
	} else {
		const notifyUpdate = APP_INITIAL_STATE.notify;
		if (!apiKey) {
			notifyUpdate.enabled = false;
		}
		updateNotify(notifyUpdate);
	}
	if (svelteInstance) {
		// if already initialized, need to cleanup old instance
		console.warn('Re-initializing Onboard and resetting back to initial state');
		reset$.next();
	}
	const app = svelteInstance || mountApp();
	updateConfiguration({
		appMetadata,
		svelteInstance: app,
		apiKey
	});
	setWalletModules(wallets);
	return API;
}
function mountApp() {
	class Onboard extends HTMLElement {
		constructor() {
			super();
		}
	}
	if (!customElements.get('onboard-v2')) {
		customElements.define('onboard-v2', Onboard);
	}
	// Add Fonts to main page
	const styleEl = document.createElement('style');
	styleEl.innerHTML = `
    ${SofiaProRegular}
  `;
	document.body.appendChild(styleEl);
	// add to DOM
	const onboard = document.createElement('onboard-v2');
	const target = onboard.attachShadow({ mode: 'open' });
	onboard.style.all = 'initial';
	target.innerHTML = `
      <style>
        :host {  
          /* COLORS */
          --white: white;
          --black: black;
          --primary-1: #2F80ED;
          --primary-100: #eff1fc;
          --primary-200: #d0d4f7;
          --primary-300: #b1b8f2;
          --primary-400: #929bed;
          --primary-500: #6370e5;
          --primary-600: #454ea0;
          --primary-700: #323873;
          --gray-100: #ebebed;
          --gray-200: #c2c4c9;
          --gray-300: #999ca5;
          --gray-400: #707481;
          --gray-500: #33394b;
          --gray-600: #242835;
          --gray-700: #1a1d26;
          --success-100: #d1fae3;
          --success-200: #baf7d5;
          --success-300: #a4f4c6;
          --success-400: #8df2b8;
          --success-500: #5aec99;
          --success-600: #18ce66;
          --success-700: #129b4d;
          --danger-100: #ffe5e6;
          --danger-200: #ffcccc;
          --danger-300: #ffb3b3;
          --danger-400: #ff8080;
          --danger-500: #ff4f4f;
          --danger-600: #cc0000;
          --danger-700: #660000;
          --warning-100: #ffefcc;
          --warning-200: #ffe7b3;
          --warning-300: #ffd780;
          --warning-400: #ffc74c;
          --warning-500: #ffaf00;
          --warning-600: #cc8c00;
          --warning-700: #664600;
  
          /* FONTS */
          --font-family-normal: Sofia Pro;
  
          --font-size-1: 3rem;
          --font-size-2: 2.25rem;
          --font-size-3: 1.5rem;
          --font-size-4: 1.25rem;
          --font-size-5: 1rem;
          --font-size-6: .875rem;
          --font-size-7: .75rem;
  
          --font-line-height-1: 24px;
          --font-line-height-2: 20px;
          --font-line-height-3: 16px;
          --font-line-height-4: 12px;
  
          /* SPACING */
          --spacing-1: 3rem;
          --spacing-2: 2rem;
          --spacing-3: 1.5rem;
          --spacing-4: 1rem;
          --spacing-5: 0.5rem;
          --spacing-6: 0.25rem;
          --spacing-7: 0.125rem;
  
          /* BORDER RADIUS */
          --border-radius-1: 24px;  
          --border-radius-2: 20px;  
          --border-radius-3: 16px;  
          --border-radius-4: 12px;  

          /* SHADOWS */
          --shadow-0: none;
          --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
          --shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
          --shadow-3: 0px 4px 16px rgba(179, 179, 179, 0.2);

          /* MODAL POSITIONING */
          --modal-z-index: 10;
          --modal-top: unset;
          --modal-right: unset;
          --modal-bottom: unset;
          --modal-left: unset;
          
          /* MODAL STYLES */
          --modal-backdrop: rgba(0, 0, 0, 0.6);
        }
      </style>
    `;
	document.body.appendChild(onboard);
	const app = new Index({
		target
	});
	return app;
}

export { init as default };
