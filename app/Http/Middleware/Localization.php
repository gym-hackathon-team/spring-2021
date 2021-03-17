<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;

class Localization
{
    /**
     * Localization constructor.
     *
     * @param  \Illuminate\Foundation\Application  $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header('Content-Language');

        if ( ! $locale) {
            $locale = $this->app->config->get('app.locale');
        }

        if ( ! array_key_exists($locale, $this->app->config->get('app.supported_languages'))) {
            $locale = $this->app->config->get('app.locale');
        }

        $this->app->setLocale($locale);

        $response = $next($request);

        $response->headers->set('Content-Language', $locale);

        return $response;
    }
}
