@inject('request', 'Illuminate\Http\Request')

<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">               
            
            <li class="header">Sales Analysis Portal</li>
            <li class="{{ $request->segment(1) == 'home' ? 'active' : '' }}">
                <a href="{{ url('/') }}">
                    <i class="fa fa-dashboard"></i>
                    <span class="title">@lang('global.app_dashboard')</span>
                </a>
            </li>
            
            @can('sales_analysis')
            <li class="treeview {{ $request->segment(1) == 'sa' ? 'active' : '' }}">
                <a href="#">
                    <i class="fa fa-building"></i>
                    <span class="title">@lang('global.SA.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">

                    <li class="{{ $request->segment(2) == 'salessummary' ? 'active active-sub' : '' }}">
                        <a href="{{ route('analysis.sa.SalesSummary') }}">
                            <i class="fa fa-object-group"></i>
                            <span class="title">
                                @lang('global.SA.fields.01')
                            </span>
                        </a>
                    </li>
                    <li class="{{ $request->segment(2) == 'byDate' ? 'active active-sub' : '' }}">
                        <a href="{{ route('analysis.sa.byDate') }}">
                            <i class="fa fa-calendar"></i>
                            <span class="title">
                                @lang('global.SA.fields.02')
                            </span>
                        </a>
                    </li>
                    <li class="{{ $request->segment(2) == 'targetcomparison' ? 'active active-sub' : '' }}">
                        <a href="{{ route('analysis.sa.TargetComparison') }}">
                            <i class="fa fa-line-chart"></i>
                            <span class="title">
                                @lang('global.SA.fields.03')
                            </span>
                        </a>
                    </li>
                    <li class="{{ $request->segment(2) == 'toplist' ? 'active active-sub' : '' }}">
                        <a href="{{ route('analysis.sa.TopList') }}">
                            <i class="fa fa-industry"></i>
                            <span class="title">
                                @lang('global.SA.fields.04')
                            </span>
                        </a>
                    </li>
                    <li class="{{ $request->segment(2) == 'region' ? 'active active-sub' : '' }}">
                        <a href="{{ route('analysis.sa.Region') }}">
                            <i class="fa fa-map-o"></i>
                            <span class="title">
                                @lang('global.SA.fields.05')
                            </span>
                        </a>
                    </li>
                </ul>
            </li>
            @endcan

            @can('REM')
            <li class="treeview {{ $request->segment(1) == 'rem' ? 'active' : '' }}">
                <a href="#">
                    <i class="fa fa-building"></i>
                    <span class="title">@lang('global.REM.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">

                    <li class="{{ $request->segment(2) == 'salessummaryREM' ? 'active active-sub' : '' }}">
                        <a href="{{ route('analysis.rem.SalesSummaryREM') }}">
                            <i class="fa fa-object-group"></i>
                            <span class="title">
                            @lang('global.REM.fields.01')
                            </span>
                        </a>
                    </li>                    
                </ul>
            </li>
            @endcan
            
            @can('admin_manage') 
            <li class="header">Management</li>         
            <li class="treeview {{ $request->segment(1) == 'admin' || $request->segment(1) ==  'system' ? 'active' : '' }}">
                <a href="#">
                    <i class="fa fa-user-secret"></i> <span>Administration</span>
                    <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu {{ $request->segment(1) == 'admin' ? 'active' : '' }}">
                    <li class="treeview {{ $request->segment(1) == 'admin' ? 'active' : '' }}">
                        <a href="#">
                            <i class="fa fa-users"></i>
                            <span class="title">@lang('global.user-management.title')</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu">
        
                            <li class="{{ $request->segment(2) == 'abilities' ? 'active active-sub' : '' }}">
                                <a href="{{ route('admin.abilities.index') }}">
                                    <i class="fa fa-briefcase"></i>
                                    <span class="title">
                                        @lang('global.abilities.title')
                                    </span>
                                </a>
                            </li>
                            <li class="{{ $request->segment(2) == 'roles' ? 'active active-sub' : '' }}">
                                <a href="{{ route('admin.roles.index') }}">
                                    <i class="fa fa-briefcase"></i>
                                    <span class="title">
                                        @lang('global.roles.title')
                                    </span>
                                </a>
                            </li>
                            <li class="{{ $request->segment(2) == 'users' ? 'active active-sub' : '' }}">
                                <a href="{{ route('admin.users.index') }}">
                                    <i class="fa fa-user"></i>
                                    <span class="title">
                                        @lang('global.users.title')
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="treeview {{ $request->segment(1) == 'system' ? 'active' : '' }}">
                        <a href="#">
                            <i class="fa fa-wrench"></i>
                            <span class="title">@lang('global.system-management.title')</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu {{ $request->segment(1) == 'system' ? 'active' : '' }}">                            
                            <li class="{{ $request->segment(2) == 'targetmaster' ? 'active active-sub' : '' }}">
                                <a href="{{ route('system.targetmaster.index') }}">
                                    <i class="fa fa-line-chart"></i>
                                    <span class="title">
                                        @lang('global.targetmaster.title')
                                    </span>
                                </a>
                            </li>
                            <li class="{{ $request->segment(2) == 'company' ? 'active active-sub' : '' }}">
                                <a href="{{ route('system.company.index') }}">
                                    <i class="fa fa-building"></i>
                                    <span class="title">
                                        @lang('global.company.title')
                                    </span>
                                </a>
                            </li>
                            <li class="{{ $request->segment(2) == 'department' ? 'active active-sub' : '' }}">
                                <a href="{{ route('system.department.index') }}">
                                    <i class="fa fa-building"></i>
                                    <span class="title">
                                        @lang('global.department.title')
                                    </span>
                                </a>
                            </li>
                            <li class="{{ $request->segment(2) == 'market' ? 'active active-sub' : '' }}">
                                <a href="{{ route('system.market.index') }}">
                                    <i class="fa fa-bank"></i>
                                    <span class="title">
                                        @lang('global.market.title')
                                    </span>
                                </a>
                            </li>
                            <li class="{{ $request->segment(2) == 'itemgroup' ? 'active active-sub' : '' }}">
                                <a href="{{ route('system.itemgroup.index') }}">
                                    <i class="fa fa-gift"></i>
                                    <span class="title">
                                        @lang('global.itemgroup.title')
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            @endcan   
                            
            <li class="{{ $request->segment(1) == 'change_password' ? 'active' : '' }}">
                        <a href="{{ route('auth.change_password') }}">
                            <i class="fa fa-key"></i>
                            <span class="title">Change password</span>
                        </a>
                    </li>
            <li>
                <a href="#logout" onclick="$('#logout').submit();">
                    <i class="fa fa-arrow-left"></i>
                    <span class="title">@lang('global.app_logout')</span>
                </a>
            </li>

        </ul>
    </section>
</aside>
{!! Form::open(['route' => 'auth.logout', 'style' => 'display:none;', 'id' => 'logout']) !!}
<button type="submit">@lang('global.logout')</button>
{!! Form::close() !!}
