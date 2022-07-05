'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">task-connect documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' : 'data-target="#xs-components-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' :
                                            'id="xs-components-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' }>
                                            <li class="link">
                                                <a href="components/DeleteModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagementTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagementTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' : 'data-target="#xs-pipes-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' :
                                            'id="xs-pipes-links-module-AdminModule-7a91468d8ed14acd6c4fecb592e89ecfc2b1e5373b102887ab3342539ab5da8ea2df57366f9f8ed406cb9b4249ca06300066389b81720bb331d03606b393e01b"' }>
                                            <li class="link">
                                                <a href="pipes/SearchFilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchFilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5c9864b38b5909bb6596374e2d11819585a65b87ad0e58731ad4b7ce34484b2f9332cacbe6dfad997f33d7d8178b9d455a888e2eedef365af3c01c595b7f9899"' : 'data-target="#xs-components-links-module-AppModule-5c9864b38b5909bb6596374e2d11819585a65b87ad0e58731ad4b7ce34484b2f9332cacbe6dfad997f33d7d8178b9d455a888e2eedef365af3c01c595b7f9899"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5c9864b38b5909bb6596374e2d11819585a65b87ad0e58731ad4b7ce34484b2f9332cacbe6dfad997f33d7d8178b9d455a888e2eedef365af3c01c595b7f9899"' :
                                            'id="xs-components-links-module-AppModule-5c9864b38b5909bb6596374e2d11819585a65b87ad0e58731ad4b7ce34484b2f9332cacbe6dfad997f33d7d8178b9d455a888e2eedef365af3c01c595b7f9899"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-17080809d2bacaedb6178c2705b988ef8df0200b67f94b28fa2b0085c34540fcf332b1c03eebdebebd4088d483c01566c88049b702f421f8f0ef37deb2902404"' : 'data-target="#xs-components-links-module-AuthModule-17080809d2bacaedb6178c2705b988ef8df0200b67f94b28fa2b0085c34540fcf332b1c03eebdebebd4088d483c01566c88049b702f421f8f0ef37deb2902404"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-17080809d2bacaedb6178c2705b988ef8df0200b67f94b28fa2b0085c34540fcf332b1c03eebdebebd4088d483c01566c88049b702f421f8f0ef37deb2902404"' :
                                            'id="xs-components-links-module-AuthModule-17080809d2bacaedb6178c2705b988ef8df0200b67f94b28fa2b0085c34540fcf332b1c03eebdebebd4088d483c01566c88049b702f421f8f0ef37deb2902404"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' : 'data-target="#xs-components-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' :
                                            'id="xs-components-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' }>
                                            <li class="link">
                                                <a href="components/TaskCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' : 'data-target="#xs-injectables-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' :
                                        'id="xs-injectables-links-module-EmployeeModule-b22ce4133c9f673eccd7a70118f0a5ba7759105efbedc0b2b2eac3175798e2d6db87ba4db991f542fcb85f41f90d2a11f92d863ef3e844fbceb3ba8c708303db"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeTaskDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeTaskDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmployeeTaskEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeTaskEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeRoutingModule.html" data-type="entity-link" >EmployeeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManagerModule.html" data-type="entity-link" >ManagerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' : 'data-target="#xs-components-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' :
                                            'id="xs-components-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' }>
                                            <li class="link">
                                                <a href="components/TaskManagementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' : 'data-target="#xs-injectables-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' :
                                        'id="xs-injectables-links-module-ManagerModule-e53344ae68e6e72396e2a9afae8e695fd6012f433bc0625908dbf9f6ebab96acdc60871b1302f64d3de43ab2c0b8bbdef1638c9ad9c1359461b8df6b024d2f40"' }>
                                        <li class="link">
                                            <a href="injectables/ManagerTaskDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerTaskDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ManagerTaskEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerTaskEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManagerRoutingModule.html" data-type="entity-link" >ManagerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-a44e887727e4570527ab76560637daca29d73f80d3ddbf3d1f25a076e22cfcfeaf59db1b54e782a4de4e0eb69f1d78f793b3003e0a4a65101887aeee5945c625"' : 'data-target="#xs-components-links-module-SharedModule-a44e887727e4570527ab76560637daca29d73f80d3ddbf3d1f25a076e22cfcfeaf59db1b54e782a4de4e0eb69f1d78f793b3003e0a4a65101887aeee5945c625"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-a44e887727e4570527ab76560637daca29d73f80d3ddbf3d1f25a076e22cfcfeaf59db1b54e782a4de4e0eb69f1d78f793b3003e0a4a65101887aeee5945c625"' :
                                            'id="xs-components-links-module-SharedModule-a44e887727e4570527ab76560637daca29d73f80d3ddbf3d1f25a076e22cfcfeaf59db1b54e782a4de4e0eb69f1d78f793b3003e0a4a65101887aeee5945c625"' }>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserCredentialsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCredentialsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewModule.html" data-type="entity-link" >ViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' : 'data-target="#xs-components-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' :
                                            'id="xs-components-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' : 'data-target="#xs-injectables-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' :
                                        'id="xs-injectables-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeTaskDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeTaskDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmployeeTaskEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeTaskEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ManagerTaskDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerTaskDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ManagerTaskEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerTaskEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' : 'data-target="#xs-pipes-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' :
                                            'id="xs-pipes-links-module-ViewModule-70e9d64c73c08bbcd68b39d54b6a80039b1933aa2cdbc34f3d85ce86681dd587c765b68ea07e41647a7a667ce0afa4b78b55502c70993b4a2875c055b42e543b"' }>
                                            <li class="link">
                                                <a href="pipes/FilterStatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterStatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewRoutingModule.html" data-type="entity-link" >ViewRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/TaskDialogComponent-1.html" data-type="entity-link" >TaskDialogComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeTaskDataService.html" data-type="entity-link" >EmployeeTaskDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeTaskEntityService.html" data-type="entity-link" >EmployeeTaskEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagerTaskDataService.html" data-type="entity-link" >ManagerTaskDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagerTaskEntityService.html" data-type="entity-link" >ManagerTaskEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchPassword.html" data-type="entity-link" >MatchPassword</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserDataService.html" data-type="entity-link" >UserDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEntityService.html" data-type="entity-link" >UserEntityService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CanLoadAdminGuard.html" data-type="entity-link" >CanLoadAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CanLoadEmployeeGuard.html" data-type="entity-link" >CanLoadEmployeeGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CanLoadManagerGuard.html" data-type="entity-link" >CanLoadManagerGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EmployeeTasksResolver.html" data-type="entity-link" >EmployeeTasksResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ManagerTasksResolver.html" data-type="entity-link" >ManagerTasksResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/NotAuthGuard.html" data-type="entity-link" >NotAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UsersResolver.html" data-type="entity-link" >UsersResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link" >AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});