# Always prefer setuptools over distutils
from setuptools import setup, find_packages
# To use a consistent encoding
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()
version = open('VERSION').read().strip()

setup(
    name='src',
    version=version,
    description='qure mini pacs to index dicoms',
    long_description=long_description,

    # The project's main homepage.
    url='https://bitbucket.org/aiinnovation/mini-pacs/',

    # What does your project relate to?
    keywords='pacs dicoms',

    # You can just specify the packages manually here if your project is
    # simple. Or you can use find_packages().
    packages=find_packages('.', exclude=['contrib', 'docs', 'tests', 'scripts']),
    install_requires=open(path.join(here, 'requirements.txt')).read().strip().split()
)
