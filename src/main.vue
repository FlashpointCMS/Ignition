<template>
    <div id="app" class="d-flex flex-column vh-100">
        <b-navbar type="light" variant="light" class="shadow-sm mb-3 py-3">
            <b-navbar-brand :to="{name: 'entities'}">Flashpoint CMS</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{name: 'entities'}" active-class="active">Entities</b-nav-item>
                    <b-nav-item href="#" disabled>Users</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"
                    :duration="300">
            <router-view class="flex-grow-1"/>
        </transition>

        <b-container fluid class="bg-light mt-3 p-4">
            <b-nav vertical>
                <b-nav-text>A Bugbird Co. experiment</b-nav-text>
            </b-nav>
        </b-container>
    </div>
</template>