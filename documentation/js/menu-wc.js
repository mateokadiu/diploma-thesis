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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f2c59c5519406ccaf03050c45d33fb3cb2463afda98d704c64d27fc185487af8ec0fe1ffec666855c89118f673604b9b3ff511274cd2f7857ad6dcae40422501"' : 'data-target="#xs-components-links-module-AppModule-f2c59c5519406ccaf03050c45d33fb3cb2463afda98d704c64d27fc185487af8ec0fe1ffec666855c89118f673604b9b3ff511274cd2f7857ad6dcae40422501"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f2c59c5519406ccaf03050c45d33fb3cb2463afda98d704c64d27fc185487af8ec0fe1ffec666855c89118f673604b9b3ff511274cd2f7857ad6dcae40422501"' :
                                            'id="xs-components-links-module-AppModule-f2c59c5519406ccaf03050c45d33fb3cb2463afda98d704c64d27fc185487af8ec0fe1ffec666855c89118f673604b9b3ff511274cd2f7857ad6dcae40422501"' }>
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
                                            'data-target="#components-links-module-AuthModule-daff9c25c1cd5f3d6540edf15e1e6895c7ae91553c2cd3a464a4e82743f6dc3a4c337857640dd4b5747d6461a42c79ed7e538fbdb43d752625531a5d4e0ab6c5"' : 'data-target="#xs-components-links-module-AuthModule-daff9c25c1cd5f3d6540edf15e1e6895c7ae91553c2cd3a464a4e82743f6dc3a4c337857640dd4b5747d6461a42c79ed7e538fbdb43d752625531a5d4e0ab6c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-daff9c25c1cd5f3d6540edf15e1e6895c7ae91553c2cd3a464a4e82743f6dc3a4c337857640dd4b5747d6461a42c79ed7e538fbdb43d752625531a5d4e0ab6c5"' :
                                            'id="xs-components-links-module-AuthModule-daff9c25c1cd5f3d6540edf15e1e6895c7ae91553c2cd3a464a4e82743f6dc3a4c337857640dd4b5747d6461a42c79ed7e538fbdb43d752625531a5d4e0ab6c5"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-9ffff53322c4c0fa7ec87abf5bd5569566702b84a473dbf73fbe66060dbddcb4d9dc1168cda09dc8007190ca70f52bb377df0ec94edad0d982ff21d5ed548726"' : 'data-target="#xs-components-links-module-SharedModule-9ffff53322c4c0fa7ec87abf5bd5569566702b84a473dbf73fbe66060dbddcb4d9dc1168cda09dc8007190ca70f52bb377df0ec94edad0d982ff21d5ed548726"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-9ffff53322c4c0fa7ec87abf5bd5569566702b84a473dbf73fbe66060dbddcb4d9dc1168cda09dc8007190ca70f52bb377df0ec94edad0d982ff21d5ed548726"' :
                                            'id="xs-components-links-module-SharedModule-9ffff53322c4c0fa7ec87abf5bd5569566702b84a473dbf73fbe66060dbddcb4d9dc1168cda09dc8007190ca70f52bb377df0ec94edad0d982ff21d5ed548726"' }>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' : 'data-target="#xs-components-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' :
                                            'id="xs-components-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' }>
                                            <li class="link">
                                                <a href="components/EventCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' : 'data-target="#xs-injectables-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' :
                                        'id="xs-injectables-links-module-TaskModule-1275d46bbde296d88af909c0fa8860110567faea2707552216ba3ce64e6cd5acdee165e17405405bd058c02dc987b4b8b781b9a0e3bebfb508dd5cfc045df5a8"' }>
                                        <li class="link">
                                            <a href="injectables/TaskDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskRoutingModule.html" data-type="entity-link" >TaskRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ViewModule.html" data-type="entity-link" >ViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ViewModule-6f56fb647cac7a7cec1dcbe004dd4d0ef42162a9e19c0bcf3f104aa103ab33bd6df41d6f8b5050a384f803625e668d30ea2b257eb75a96e96c9889b1f954c558"' : 'data-target="#xs-components-links-module-ViewModule-6f56fb647cac7a7cec1dcbe004dd4d0ef42162a9e19c0bcf3f104aa103ab33bd6df41d6f8b5050a384f803625e668d30ea2b257eb75a96e96c9889b1f954c558"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewModule-6f56fb647cac7a7cec1dcbe004dd4d0ef42162a9e19c0bcf3f104aa103ab33bd6df41d6f8b5050a384f803625e668d30ea2b257eb75a96e96c9889b1f954c558"' :
                                            'id="xs-components-links-module-ViewModule-6f56fb647cac7a7cec1dcbe004dd4d0ef42162a9e19c0bcf3f104aa103ab33bd6df41d6f8b5050a384f803625e668d30ea2b257eb75a96e96c9889b1f954c558"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
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
                                    <a href="injectables/MatchPassword.html" data-type="entity-link" >MatchPassword</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskDataService.html" data-type="entity-link" >TaskDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskEntityService.html" data-type="entity-link" >TaskEntityService</a>
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
                                <a href="guards/NotAuthGuard.html" data-type="entity-link" >NotAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TasksResolver.html" data-type="entity-link" >TasksResolver</a>
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